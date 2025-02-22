import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export const sentEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,  // Secure credentials using environment variables
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Confirmation of Successful Registration",
      text: "Your registration is successful. Thank you for joining us!",
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
export default sentEmail;

