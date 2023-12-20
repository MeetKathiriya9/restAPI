import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    name: {type:String , required:true},
    price: {type:Number , required:true},
    size: {type:String , required:true},
    image: {type:String , required:true}
},{timestamps:true})

export default mongoose.model("product",productschema);