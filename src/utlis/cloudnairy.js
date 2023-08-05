import * as dotenv from "dotenv"
import cloudinary from 'cloudinary'
 
dotenv.config()
// Configuration 

cloudinary.v2.config({
    cloud_name: "dqowsrf2o",
    api_key: "214478725421537",
    api_secret: "nuqNaBbM7vF4uA-kyvPvwlybzJQ",
    secure:true
  });

  export default cloudinary.v2