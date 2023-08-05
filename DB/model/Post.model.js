import mongoose, {Schema, model, Types} from "mongoose"

const postSchema= new Schema({
    postName:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        
    },
    caption:String,
    postPic:Object,
    userId:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    like: [{
        type:Types.ObjectId ,
        ref:"User"
     }],
    unlike: [{
        type:Types.ObjectId ,
        ref:"User"
     }],
    isDeleted:{
        type:Boolean,
        default:false
     }
},
{
    timestamps:true
})

const postModel = mongoose.models.Post || model("Post",postSchema);

export default postModel