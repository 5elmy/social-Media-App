
import  nodemailer  from  "nodemailer"

async function sendEmail({to , subject ,text ,html ,attachments, cc,bcc}) {



  let transporter = nodemailer.createTransport({
   
    service:"gmail",
    auth: {
      user:process.env.SENDER , // generated ethereal user
      pass:process.env.SENDERPASSWORD , // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"sayed team 👻" ${process.env.SENDER}`, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
    bcc,
    cc,
    attachments

  });

  console.log(info)
  return info.rejected.length ? false : true
}

export default  sendEmail

