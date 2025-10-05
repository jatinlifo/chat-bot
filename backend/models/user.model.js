import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    sender: {
        type: String,
        required: true,
        enum: ["user"]
    },
    text: {
        type: String,
        required: true
    }
}, {timestamps: true})

export  const User = mongoose.model("User", userSchema)