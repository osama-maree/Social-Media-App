const nodemailer = require("nodemailer");//package nodemailer send for email,free
const sendEmail = async (dest, subject, message) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `Saraha app`, // sender address
    to: dest, // list of receivers 
    subject: subject, // Subject line
    html: message, // html body
  });
};

module.exports = { sendEmail };
