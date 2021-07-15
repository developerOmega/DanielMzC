import nodemailer = require('nodemailer');
import { EmailEnv } from './config';

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: EmailEnv.email, // generated ethereal user
    pass: EmailEnv.password, // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
})