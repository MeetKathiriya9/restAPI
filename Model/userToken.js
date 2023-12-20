import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RefreshSchema = new Schema({
    token: { type: String, unique: true },
},{ timestamps : false })

export default mongoose.model("RefreshSchema",RefreshSchema);