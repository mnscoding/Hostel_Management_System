const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "bardwadakida@gmail.com",
    pass: "sxzw yxgl qbfk qywk",
  },
});

function sendMail(to, sub, msg) {
  transporter.sendMail({
    to: to,
    subject: sub,
    html: msg,
  });
}

module.exports = { sendMail };

/*
function sendMail(to, sub, msg) {
  try {
    await;
    transporter.sendMail({
      to: to,
      subject: sub,
      html: msg,
    });
  } catch (err) {
    console.error("Email failed:", err);
  }
}

module.exports = { sendMail };*/
