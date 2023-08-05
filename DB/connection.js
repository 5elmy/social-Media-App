 import mongoose from "mongoose";

 const connection = async()=>{
    return await mongoose.connect(`mongodb://127.0.0.1:27017/stackOverFlow`).then((result)=>{
        console.log("DataBase is connected .... ")
    }).catch((err)=>{
        console.log(`failed connection with dataBase.. ${err} `)
    })
 }


 export default connection