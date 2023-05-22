const nodemailer = require("nodemailer");

/**
 * Email sending function
 * For local development you can use any local SMTP like smtp4dev 
 * you can install natively or using docker
 * https://mailosaur.com/blog/a-guide-to-smtp4dev/
 * https://hub.docker.com/r/rnwood/smtp4dev
 */
async function sendEmail() {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 2525,
    secure: false, 
    auth: {
      user: testAccount.user, 
      pass: testAccount.pass, 
    },
  });

  let mailRes;
  try {
    mailRes = await transporter.sendMail({
      from: '"NO-REPLY" <admin@example.com>', 
      to: "user1@example.com, user2@example.com",
      subject: "CAUTION ⚠️", 
      text: "Your website is down!",
      html: "<b>Your website is down!</b>",
    });
  } catch (error) {
    console.log(error);
    return error
  }

   return mailRes;

  }


  module.exports = {
    sendEmail
  };