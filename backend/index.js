import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/dbconnection.js'
import chatbotRoutes from './routes/chatbot.route.js'
import cors from 'cors'

const app = express()
dotenv.config()
const port = process.env.PORT || 3000


connectDB()
.then(() => {
    console.log("Conneted to MongoDB")
})
.catch((error) => {
    console.log(`MongoDB connection FAILED !!!!! ${error}`)
})

app.use(express.json());
app.use(cors());
app.use('/bot/v1', chatbotRoutes)
app.listen(port, () => { 
    console.log(`Server is Running on Port ${port}`)
})



