import express from 'express'
import Message from '../controllers/chatbot.controller.js';

const router = express.Router();

router.post("/message", Message);

export default router;