import Router from 'express';
import auth from '../../middleware/auth.middleware.js';
import { validtion } from '../../middleware/validtion.middleware.js';
import { fileUpload, fileValidation } from '../../utlis/cloudmulter.js';
import { asyncHandling } from '../../utlis/errorHandling.js';
import * as userController from "../User/controller/user.controller.js"
import { profilePic } from './user.validation.js';
const router = Router()

router.get("/",userController.getusers) ;
router.patch("/pic",fileUpload({customValidation:fileValidation.image}).single("image"),validtion(profilePic),auth,asyncHandling(userController.picupload)) ;
  

export default router