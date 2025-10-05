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
app.use(cors({
    origin: [" http://localhost:3000/bot/v1/message",
        "https://chat-bot-weld-mu-96.vercel.app/"]
}));
app.use('/bot/v1', chatbotRoutes)

app.get('/', (req, res) => {
    res.send({
        activeStatus: true,
        error: false,
    })
})

app.listen(port, () => { 
    console.log(`Server is Running on Port ${port}`)
})



