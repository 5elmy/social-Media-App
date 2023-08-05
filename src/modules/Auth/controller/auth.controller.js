import userModel from "../../../../DB/model/User.model.js"
import { compareData, hashData } from "../../../utlis/bcryptData.js"
import { generateToken, verifyToken } from "../../../utlis/create&verifytoken.js"
import { ResError } from "../../../utlis/errorHandling.js"

import sendEmail from "../../../utlis/sendEmail.js"
import Html_confirmEmail from "../../../utlis/templateEmail.js"


export const getusers =async(req,res,next)=>{

    const users = await userModel.find({})
    return  res.json({message:"Done" , users})
}

export const signUp =async(req,res,next)=>{
  const {userName , email , age , password}= req.body
  const checkUser =await userModel.findOne({email})
  if(checkUser)
  {
    return next (new ResError('Email Areadly Exist... ',409) )
  }
  //confirm email 
  const confirm_Email_token = generateToken({payload:{email},signture:process.env.CONFIRM_EMAIL_SIGNTURE ,expiresIn:60*2})
  const confirm_Email_refresh_token = generateToken({payload:{email},signture:process.env.CONFIRM_EMAIL_SIGNTURE ,expiresIn:60*60*24*30})
  const link= `http://localhost:5000/auth/confirmEmail/${confirm_Email_token}`
  const refreshlink= `http://localhost:5000/auth/newconfirmEmail/${confirm_Email_refresh_token}`
   
   const html =Html_confirmEmail(link,refreshlink)
   /**`<a href="${link}">click here to confirm email</a> 
                 <br><br><br><br>
                 <a href="${refreshlink}">click here to new confirm email</a> ` */
  const subject = "Confirm Email"
  const info = await sendEmail({to:email ,subject:subject , html:html})

  if(!info)
  {
    return next (new ResError("Rejected Email " ,400))
  }
    const hashPassword = hashData({plaintext:password })
    const createUser = await userModel.create({userName , email , age , password:hashPassword})
    return  res.status(201).json({message:"User added successfully" , createUser})
}

//confirmEmail
export const confirmEmail =async(req,res,next)=>{
  const token = req.params.token;

  const {email} = verifyToken({payload:token ,signture:process.env.CONFIRM_EMAIL_SIGNTURE});

  const user = await userModel.updateOne({email:email ,confirmEmail:false },{confirmEmail:true},{new:true});
  return user.modifiedCount? res.status(200).redirect('https://youtu.be/DDOD1AEmyLE') : 
                                                                                        next (new ResError("not register account",400)) 
 
}
//new confirm Email
export const newConfirmEmail = async (req,res,next)=>{
  const token = req.params.token;
  const{ email} = verifyToken({payload:token , signture:process.env.CONFIRM_EMAIL_SIGNTURE})
  const newToken= generateToken({payload:{email} , signture:process.env.CONFIRM_EMAIL_SIGNTURE ,expiresIn:60*1})
  const link= `http://localhost:5000/auth/confirmEmail/${newToken}`
  const refeshlink= `http://localhost:5000/auth/confirmEmail/${token}`
  const html= `<a href=${link}>click here to new confirm email</a> 
               <br><br><br><br>  
               <a href=${refeshlink}>click here to refresh confirm email</a>`
  const info= await sendEmail({to:email ,subject:"New Confirm Email" ,html})
  if(!info)
  {
    return next (new ResError("Rejected Email " ,400))

  }
  return res.send("Done please check your email")
}

//login
export const login = async (req,res,next)=>{
    const {email,password}= req.body;
  const checkUser =await userModel.findOne({email})
  if(!checkUser || checkUser.confirmEmail==false)   // !checkUser.confirmEmail
  {
    return next (new ResError(' Not register account',400))
  }
 
  const match = compareData({plaintext:password ,hashValue:checkUser.password })
  console.log(match)
  if(!match )
  {
    return next(new ResError("in-valid password",400))
  }

  const token= generateToken({payload:{id:checkUser._id , email:checkUser.email , isLoggedIn:true}})
  return res.status(202).json({ message: "Logged in successfully" , access_token : token }); 
}
//forget password

export const forgetPassword = async(req,res,next)=>{
  const {email}=req.body;
  const checkUser= await userModel.findOne({email})
  if(!checkUser)
  {
    return next(new ResError("not register account",400))
  }
  const token =generateToken({payload:{email},signture:process.env.PASSWORD_SIGNTURE,expiresIn:60*10})
  const link= `http://localhost:5000/auth/resetPassword/${token}`
  const html = `<a href=${link}>click here to update password</a>`
  const info = sendEmail({to:email ,subject:"Update Password ", html})
  if(!info)
  {
    return next (new ResError("Rejected Email " ,400))
  }
  return res.json({message:"check your email"})
}

export const resetPassword =async(req,res,next)=>{
  const token =req.params.token
  const {password} =req.body
  const {email} = verifyToken({payload:token, signture:process.env.PASSWORD_SIGNTURE })
  const hashPassword= hashData({plaintext:password})
  const user= await userModel.updateOne({email},{password:hashPassword})
  return user.modifiedCount? res.json({message:"success reset Password",user}) :
                                                                                 next(new ResError(" error not reset password"))
}

