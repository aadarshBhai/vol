import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../models/User.js";

const router = express.Router();

// Note: Do NOT create transporter at module load, env may not be loaded yet in ESM import order.
// Instead, create it inside the handler using current process.env.

// -------------------- SIGNUP --------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, password: hashedPassword });

    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- LOGIN --------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // In future you can use real JWT; for now return a simple token
    const token = `token-${user._id}`;

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- FORGOT PASSWORD --------------------
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate JWT token for reset (expires in 15 min)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    const resetLink = `${process.env.FRONTEND_BASE_URL}/reset-password?token=${token}`;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS.replace(/"/g, ''), // Remove any quotes from the password
      },
      tls: {
        rejectUnauthorized: false // Only for development with self-signed certificates
      }
    });

    // Verify connection configuration
    await new Promise((resolve, reject) => {
      transporter.verify(function(error, success) {
        if (error) {
          console.error('SMTP Connection Error:', error);
          reject(new Error('Failed to connect to email server'));
        } else {
          console.log('Server is ready to take our messages');
          resolve(success);
        }
      });
    });

    // Send email
    await new Promise((resolve, reject) => {
      transporter.sendMail({
        from: `"Volvoro Support" <${process.env.SMTP_FROM}>`,
        to: email,
        subject: "Password Reset Request",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">Password Reset Request</h2>
            <p>Hello ${user.name || 'there'},</p>
            <p>We received a request to reset your password. Click the button below to set a new password:</p>
            <div style="margin: 25px 0;">
              <a href="${resetLink}" 
                 style="background-color: #4f46e5; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 4px; font-weight: bold;">
                Reset Password
              </a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all;">${resetLink}</p>
            <p style="color: #6b7280; font-size: 0.875rem;">
              This link will expire in 15 minutes. If you didn't request this, please ignore this email.
            </p>
          </div>
        `,
      }, (err, info) => {
        if (err) {
          console.error('Error sending email:', err);
          reject(new Error('Failed to send reset email'));
          return;
        }
        console.log('Email sent:', info.messageId);
        resolve(info);
      });
    });

    res.json({ 
      ok: true, 
      message: "Password reset link has been sent to your email address. Please check your inbox (and spam folder)." 
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- RESET PASSWORD --------------------
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
      return res.status(400).json({ message: "Token and new password are required" });

    // Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ ok: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

export default router;
