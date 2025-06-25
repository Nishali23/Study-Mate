const nodemailer = require("nodemailer");

const sendEmail = async (toEmail, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"StudyMate App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject,
    html: message,
  });
};

module.exports = sendEmail;
