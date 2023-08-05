import Router from 'express';
import * as postController from "../Post/controller/post.controller.js"
const router = Router()
  router.get("/",postController.getPosts) ;


export default router