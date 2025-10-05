import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config(
    {path: './env'}
)
const DB_NAME = "chatbot"
const connectDB = async () => {

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB host : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`MongoDB connection failed ${error}`)
    }
}

export default connectDB;