const nodemailer = require('nodemailer');
const welcome = require('./welcom');
const purchase = require('./purchase');
const ResetPassword = require('./ResetPassword');

// USE .env
require('dotenv').config();

const mailOption = (to, name, token, template, data) => {
  let option = '';

  switch (template) {
    case 'welcome':
      option = {
        from: 'Saeed <saeedt7879s@gmail.com>',
        to,
        subject: `Welcom ${name} to our site`,
        html: welcome(name),
      };
      break;
    case 'purchase':
      option = {
        from: 'Saeed <saeedt7879s@gmail.com>',
        to,
        subject: `Thanks ${name} for your trust 🙏🙏🙏`,
        html: purchase(name, data),
      };
      break;
    case 'reset_password':
      option = {
        from: 'Saeed <saeedt7879s@gmail.com>',
        to,
        subject: `Dear ${name}, Reset your password`,
        html: ResetPassword(data),
      };
      break;
    default:
      option;
  }

  return option;
};

const sendMail = async (to, name, token, type, data = null) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'saeedt7879s@gmail.com',
      pass: process.env.MAIL_PASS,
    },
  });

  const mail = mailOption(to, name, token, type, data);

  transporter.sendMail(mail, (err, info) => {
    if (err) console.log(err);
    else console.log('Email sent');
    transporter.close();
  });
};

module.exports = sendMail;
