import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true
    },
    icon:{
        type:String,
        default:""
    },
    color:{
        type:String,
        default:""
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

},{timestamps:true})

const Category = mongoose.model("Category",categorySchema)
export default Category