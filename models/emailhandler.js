const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendEmail = (email) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: email.email,
      to: process.env.APP_USER,
      subject: email.subject,
      text: email.message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve();
      }
    });
  });
};

module.exports = {
  sendEmail,
};
