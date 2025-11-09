import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'thevolvoro@gmail.com';
const SMTP_USER = process.env.SMTP_USER || 'thevolvoro@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS.replace(/["]/g, ''), // Remove any quotes from the password
      },
    });

    // Format the email content
    const emailContent = `
      New Booking Request Received
      ===========================
      
      Travel Details:
      - From: ${formData.fromLocation}
      - To: ${formData.toLocation}
      - Budget: ₹${formData.budget}
      
      Travel Dates:
      - Departure: ${formData.departureDate} at ${formData.departureTime}
      - Return: ${formData.returnDate} at ${formData.returnTime}
      
      Group Details:
      - Travel Type: ${formData.travelType}
      - Number of People: ${formData.partySize}
      
      Preferences:
      - Food: ${formData.foodPreference || 'Not specified'}
      - Transport: ${formData.transportPreference || 'Not specified'}
      - Activities: ${formData.activities?.join(', ') || 'Not specified'}
      
      Contact the customer for more details.
    `;

    // Send mail with defined transport object
    await transporter.sendMail({
      from: `"Volvo Tours" <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: 'New Booking Request',
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Booking Request</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-top: 0;">Travel Details</h3>
            <p><strong>From:</strong> ${formData.fromLocation}</p>
            <p><strong>To:</strong> ${formData.toLocation}</p>
            <p><strong>Budget:</strong> ₹${formData.budget}</p>
            
            <h3 style="color: #1e40af; margin-top: 20px;">Travel Dates</h3>
            <p><strong>Departure:</strong> ${formData.departureDate} at ${formData.departureTime}</p>
            <p><strong>Return:</strong> ${formData.returnDate} at ${formData.returnTime}</p>
            
            <h3 style="color: #1e40af; margin-top: 20px;">Group Details</h3>
            <p><strong>Travel Type:</strong> ${formData.travelType}</p>
            <p><strong>Number of People:</strong> ${formData.partySize}</p>
            
            <h3 style="color: #1e40af; margin-top: 20px;">Preferences</h3>
            <p><strong>Food:</strong> ${formData.foodPreference || 'Not specified'}</p>
            <p><strong>Transport:</strong> ${formData.transportPreference || 'Not specified'}</p>
            <p><strong>Activities:</strong> ${formData.activities?.join(', ') || 'Not specified'}</p>
          </div>
          <p>Please contact the customer for more details.</p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: 'Booking request sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send booking request',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
