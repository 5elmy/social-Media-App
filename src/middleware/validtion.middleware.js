import Joi from "joi"
import { Types } from "mongoose"
import { ResError } from "../utlis/errorHandling.js"

const idValidation =(value,helper)=>{
 
    return Types.ObjectId.isValid(value)? true:helper.message("in-vaild objectId")

}
export const generalFelids= {
    userName: Joi.string().alphanum().min(3).max(30).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(), //pattern( new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) .required(),
    phone:Joi.number().integer().min(11).max(11),
    gender: Joi.string().valid("Male","Female"),
    age:Joi.number().integer().min(18).max(95),
    id:Joi.string().custom(idValidation).required() , //hex().min(24).max(24).required()
    file: Joi.object({
        size:Joi.number().positive(),
        path:Joi.string(),
        filename:Joi.string(),
        destination:Joi.string(),
        mimetype:Joi.string(),
        encoding:Joi.string(),
        originalname:Joi.string(),
        fieldname:Joi.string()
    })
}

export const validtion=(schema)=>{
    return (req,res,next)=>{
        const inputs={...req.body,...req.file,...req.params,...req.query}
        // if(req.headers?.authorization)
        // {
        //    inputs.authorization = req.headers.authorization
        // }
        // if(req.file || req.files)
        // {
        //    inputs.file = req.file ||req.files
        // }

      const {error}= schema.validate(inputs , {abortEarly:false})
        if(error)
        {
            const message= error.details.map(ele=>ele.message)
            return next(new ResError(message))
        }
        else
        {
            next()
        }


    }
}