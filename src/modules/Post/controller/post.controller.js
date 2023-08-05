import postModel from "../../../../DB/model/Post.model.js"

export const getPosts =async(req,res,next)=>{

    const posts = await postModel.find({})
    return  res.json({message:"Done" , posts})
}
export const createPost =async(req,res,next)=>{
      const {title , caption} = req.body;

    const post = await postModel.create({title:title , caption:caption ,userId})
    return  res.json({message:"Done" , post})
}