import userModel from "../../../../DB/model/User.model.js"
import cloudnairy from "../../../utlis/cloudnairy.js"
import { ResError } from "../../../utlis/errorHandling.js"

export const getusers =async(req,res,next)=>{

    const users = await userModel.find({})
    return  res.json({message:"Done" , users})
}
export const picupload =async(req,res,next)=>{

  if(!req.file)
  {
     return next(new ResError("file is required",400)) 
  }
//   const images= []
//   const cloud= await cloudnairy.uploader.upload(req.file.path ,{folder:`template/email`})

//   for(const file of req.files)
//   {
//      images.push(secure_url,public_id)
//   }
const {secure_url,public_id} = await cloudnairy.uploader.upload(req.file.path,{folder:`user/${req.user.id}/profile`});


   const user = await userModel.findByIdAndUpdate(req.user.id,{userPic:{secure_url,public_id}},{new:true})

   return res.json({message:"Done" ,user})
 






}