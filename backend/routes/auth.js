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
// CORS middleware for forgot-password
const allowCors = (req, res, next) => {
  const allowedOrigins = [
    'https://volvorotourexplorer.com',
    'https://www.volvorotourexplorer.com',
    'http://localhost:3000',
    'http://localhost:8080'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
};

// Apply CORS middleware specifically to forgot-password
router.options("/forgot-password", allowCors);
router.post("/forgot-password", allowCors, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate JWT token for reset (expires in 15 min)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    const resetLink = `${process.env.FRONTEND_BASE_URL}/reset-password?token=${token}`;

    // Create transporter with improved configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail's SMTP server
      host: 'smtp.gmail.com', // Gmail SMTP server
      port: 465, // Gmail's secure port
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'thevolvoro@gmail.com',
        pass: process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/"/g, '') : 'zbfz xxtc fsby xyrz',
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 5000,    // 5 seconds
      socketTimeout: 10000,     // 10 seconds
      debug: true,              // Show debug logs
      logger: true              // Log connection details
    });

    // Verify connection configuration with timeout
    try {
      await new Promise((resolve, reject) => {
        // Set a timeout for the connection test
        const timeout = setTimeout(() => {
          reject(new Error('SMTP Connection timeout'));
        }, 10000); // 10 second timeout

        transporter.verify((error, success) => {
          clearTimeout(timeout);
          if (error) {
            console.error('SMTP Connection Error:', error);
            reject(new Error(`Failed to connect to email server: ${error.message}`));
          } else {
            console.log('✅ SMTP Server is ready to send emails');
            resolve(success);
          }
        });
      });
    } catch (error) {
      console.error('SMTP Connection Test Failed:', error);
      throw new Error(`Email server connection failed: ${error.message}`);
    }

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
