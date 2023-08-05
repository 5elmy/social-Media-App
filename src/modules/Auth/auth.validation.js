import Joi from "joi";
import { generalFelids } from "../../middleware/validtion.middleware.js";


export const signUpValidation=Joi.object({
    userName:generalFelids.userName,
    email:generalFelids.email,
    password:generalFelids.password,
    confirmPassword:generalFelids.password.valid(Joi.ref("password")),
    age:generalFelids.age,
    gender:generalFelids.gender,
    phone:generalFelids.phone
}).required();


export const loginValidation=Joi.object({
    
    email:generalFelids.email,
    password:generalFelids.password
  
}).required() 
export const resetPasswordValidation=Joi.object({
    
   //token
    password:generalFelids.password
  
}).required() 
export const forgetPasswordValidation=Joi.object({
    
    email:generalFelids.email
  
}).required() 