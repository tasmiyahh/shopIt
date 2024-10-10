import nodemailer from 'nodemailer' //npm kiya

const sendEmail = async(options)=>{ //login krk mailtrap ko test mode me emailtesting  pe gye wahN shopit likha phir os link ko click kiya tw ye code mila osko copy krliya
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,

        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,

          pass:process.env.SMTP_PASSWORD,
        }
      });
      const message ={ //enter detail
        from : `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to : options.email,
        subject : options.subject,
        html :  options.message
      }
      await transport.sendMail(message) //send email to user
}

export default sendEmail