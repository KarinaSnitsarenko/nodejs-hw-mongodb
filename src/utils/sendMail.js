// import nodemailer from 'nodemailer';
// import { env } from './env.js';
// import { SMTP } from '../contacts/index.js';

// const transporter = nodemailer.createTransport({
//   host: env(SMTP.SMTP_HOST),
//   port: Number(env(SMTP.SMTP_PORT)),
//   auth: {
//     user: env(SMTP.SMTP_USER),
//     pass: env(SMTP.SMTP_PASSWORD),
//   },
// });

// export const sendMail = async (options) => {
//   return await transporter.sendMail(options);
// };

import nodemailer from 'nodemailer';
import { env } from './env.js';
import { SMTP } from '../contacts/index.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

export const sendMail = async (options) => {
  try {
    const result = await transporter.sendMail(options);
    console.log('Email sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
