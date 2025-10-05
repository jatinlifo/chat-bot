import { Bot } from "../models/bot.model.js";
import { User } from "../models/user.model.js";
import dotenv from 'dotenv'
import axios from "axios";

dotenv.config();


const Message = async (req, res) => {

    try {
        const { text } = req.body;
        if (!text?.trim()) {
            return res
                .status(400)
                .json({ error: "Text cannot be empty" });
        }

        const user = await User.create({
            sender: "user",
            text,
        })


        // my trained response
        const myTrainedResponses = [
            { keywords: ["hi", "hii", "hello"], reply: "Hello!,How can i help you?" },
            { keywords: ["c++", "cpp"], reply: "C++ is a powerful programming language." },
            { keywords: ["your name"], reply: "I am your friendly chatbot!" },
            { keywords: ["who is jatin"], reply: "Jatin created me, and he is a software engineer and competitive programmer 😊"},
        ];

        function normalizeInput(text) {
            return text.toLowerCase().trim().replace(/[^\w\s]/gi,"");
        }

        function getMyBotResponse(userInput) {
            const normalized = normalizeInput(userInput);

            for (let item of myTrainedResponses) {
                if (item.keywords.some(word => normalized.includes(word))) {
                    return item.reply;
                }
            }
            return null;
        }

        //Google search via SerpAPi
        const response = await axios.get("https://serpapi.com/search.json", { // google data ko json ma send kiya jata hai
            params: { // parameters
                q: text, // query kya hai
                engine: "google", // kis engine pa jana hai
                api_key: process.env.SERPAPI_KEY, // tum valid user ho ya nahi
                num: 1 // one he response do
            }
        });
        //Bot ka answer
        const results = response.data.organic_results || [];
        //response.data => pura JSON jo API sa aya
        //organic_results => normal google ke search result without paid ads
        let botResponse =  getMyBotResponse(text);

        //agar trained response nahi mila
        if (!botResponse) {
            botResponse = results[0]?.snippet;
        }

        //agar snippet bhi nahi mila
        if (!botResponse) {
            botResponse = "Sorry, I didn't understand that."
        }
        // snippet means short summary ya result


        // *** normal hum trained kar ra *** 
        //chat bot ko trained karo aapna acc


        // return response
        // const normalizedText = text.toLowerCase().trim();

        // const botResponse = trendBotResponse[normalizedText] || "Sorry, I don't understand that.";

        //Bot ka message database me save
        const bot = await Bot.create({
            text: botResponse
        })

        return res
            .status(200)
            .json({
                userMessage: user.text,
                botMessage: bot.text,

            })

    } catch (error) {
        console.log("Error in message Controller: ", error);
        return res
            .status(500)
            .json({ error: "Something went wrong" });
    }
};

export default Message;