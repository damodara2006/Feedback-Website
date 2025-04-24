import nodemailer from 'nodemailer';
import dotenv from "dotenv"
import AsyncHandler from '../utils/AsyncHandler.js';

dotenv.config({
    path:'.env'
})
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,               // or 587 with secure: false
    secure: true,            // true for 465
    auth: {
      user: 'damodara2006@gmail.com', // or a Gmail/G‑Suite alias
      pass: process.env.MAIL_PASS,   // app password / SMTP password
    },
  });
  


  const verify = AsyncHandler(async(req,res)=>{
    const{email} = req.body;
    const randomnumber = Math.random(1 , 5) * 1000000
    console.log(randomnumber.toFixed())
    console.log(email)
    await transporter.sendMail({
      from: '"Damodara Prakash P" <damodara2006@gmail.com>',
      to: email,
      subject: 'test sendmail',
      html: `Your verification code is ${randomnumber.toFixed()} valid for 60 minutes`,
    });
    res.send(randomnumber.toFixed())
  })

  export default verify;