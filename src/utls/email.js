import nodemailer from "nodemailer";

export async function sendEmail(to,subject,html){

    const transporter = nodemailer.createTransport({
       service:'gmail',
        auth: {
          user:process.env.EMAIL_SENDER,
          pass: process.env.EMAIL_PASS,
        },
        tls:{
            rejectUnauthorized:false
        }
      });

      const info = await transporter.sendMail({
        from: `T shop ecOmecre <${process.env.EMAIL_SENDER}>`, // sender address
        to, // list of receivers
        subject, // Subject line // plain text body
        html, // html body
      });

      return info;
}