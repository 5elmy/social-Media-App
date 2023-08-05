import multer from "multer"

export const  fileValidation={
    image:["image/jpg","image/gif","image/jpeg","image/tiff","image/png"],
    file:["application/pdf","application/msword"]
}

export const fileUpload=({customValidation = fileValidation.image})=>{
    const storage = multer.diskStorage({})
  
    const filefilter=(req,file,cb)=>{
        if(customValidation.includes(file.mimetype)){
            cb(null,true)

        }
        else
        {
          cb("in-vaild format",false)
        }
    }

    const upload = multer({ storage ,filefilter })
    return upload
}