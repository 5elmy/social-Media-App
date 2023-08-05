
export class ResError extends Error{
    constructor(message ,status){
        super(message)
        this.status= status
    }
}

export const asyncHandling =(func)=>{
    return (req,res,next)=>{
    func(req,res,next).catch(err=>{
         next (new ResError(err))
    })
    }
}


export const golbalErrorHandling = (err,req,res,next)=>{

 if(err)
 {
    const statusCode = err.statusCode ||500 ;
    const message = err.message ||'Internal Server Error'
    return res.status(statusCode).json({message:message , err })
 }

}