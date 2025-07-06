const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.Email,
    to: email,
    subject: `Login otp `,
    text: `Your otp is ${otp}`,
  });
};

module.exports = sendOTP;
