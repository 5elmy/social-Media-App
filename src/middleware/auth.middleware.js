import userModel from "../../DB/model/User.model.js"
import { verifyToken } from "../utlis/create&verifytoken.js"
import { asyncHandling, ResError, } from "../utlis/errorHandling.js"

 
 
 const auth =asyncHandling(async(req,res,next)=>{
    const {authorization}= req.headers
    if(!authorization)
    {
        return next(new ResError('authorization is required..',400))
    }
    if(!authorization.startsWith(process.env.BEARER_KEY))
    {
        return next(new ResError("in-valid authorization",400))
    }
    const token = authorization.split(process.env.BEARER_KEY)[1]
    if(!token)
    {
        return next(new ResError('Token is required.. ',400)) 
    }
    const decoded= verifyToken({payload:token ,signture:process.env.TOKEN_SIGNTURE})
    if(!decoded.id || !decoded.isLoggedIn==true || !decoded.email)
    {
        return next(new ResError('in-vaild token payload..',400))
    }
    const authUser= await userModel.findById({_id:decoded.id})
             if(!authUser)
             {
                return next (new ResError('not register account',400))
             }
    req.user= authUser
    return next()
})
export default auth