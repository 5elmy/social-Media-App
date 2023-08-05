import connection from "../DB/connection.js"
import authController from "../src/modules/Auth/auth.router.js"
import userController from "../src/modules/User/user.router.js"
import postController from "../src/modules/Post/post.router.js"
import { golbalErrorHandling } from "./utlis/errorHandling.js"

const initApp = (app, express)=>{
//buffer Data
app.use(express.json({}))
//auth
app.use("/auth",authController)
//user
app.use("/user",userController)
//post
app.use("/post",postController)
//golbal error
app.use(golbalErrorHandling)
app.get('/', (req, res) => res.send('Hello World!'))
//connection with DB
connection()
}

export default initApp