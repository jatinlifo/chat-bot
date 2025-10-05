import mongoose, {Schema} from "mongoose";

const botSchema = new Schema({
    text: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Bot = mongoose.model("Bot", botSchema);