import Router from 'express';
import { asyncHandling } from '../../utlis/errorHandling.js';
import * as authController from "../Auth/controller/auth.controller.js"
const router = Router()
  router.get("/",authController.getusers) ;
  router.post("/signup",asyncHandling(authController.signUp)) ;
  router.post("/login",asyncHandling(authController.login)) ;
  router.get("/confirmEmail/:token",asyncHandling(authController.confirmEmail)) ;
  router.get("/newconfirmEmail/:token",asyncHandling(authController.newConfirmEmail)) ;
  router.get("/forgetPassword",asyncHandling(authController.forgetPassword)) 
  router.patch("/resetPassword/:token",asyncHandling(authController.resetPassword)) 


export default router