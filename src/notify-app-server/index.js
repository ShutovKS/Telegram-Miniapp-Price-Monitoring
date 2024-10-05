import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import {handleStartCommand} from './kernel/commands/commands.js';
import {COMMANDS} from './config/constants.js';
import {connectDB} from './kernel/services/db/database.js';
import {registerUser} from './kernel/services/db/user.js';
import User from "./src/models/user.js";
import express from "express";
import cors from "cors";
import router from "./config/routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const URL = process.env.URL;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

try {
    await connectDB();

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const message = msg.text;

        const userId = msg.from.id;
        const username = msg.from.username;

        switch (message) {
            case COMMANDS.START:

                const user = await User.findOne({telegram_id: userId});
                if (!user) {
                    registerUser(userId, username, chatId);
                }

                await handleStartCommand(bot, chatId);
                break;
            default:
                await bot.sendMessage(chatId, 'Команда не распознана.');
                break;
        }
    });

    app.listen(PORT, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Server is running on port ${PORT}`);
        }
    });

} catch (e) {
    console.error(e);
}
