import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import {handleStartCommand} from './kernel/commands/commands.js';
import {COMMANDS} from './config/constants.js';
import {connectDB} from './kernel/services/db/database.js';
import {registerUser} from './kernel/services/db/user.js';
import User from "./src/models/user.js";

dotenv.config();
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

connectDB().then();

// {
//     message_id: ID_СООБЩЕНИЯ,
//         from: {
//     id: ID_ПОЛЬЗОВАТЕЛЯ,
//         is_bot: false,
//         first_name: ИМЯ_ПОЛЬЗОВАТЕЛЯ,
//         username: НИК_ПОЛЬЗОВАТЕЛЯ,
//         language_code: 'ru'
// },
//     chat: {
//         id: ID_ЧАТА,
//             first_name: ИМЯ_ПОЛЬЗОВАТЕЛЯ,
//             username: НИК_ПОЛЬЗОВАТЕЛЯ,
//             type: 'private'
//     },
//     date: 1686255759,
//         text: ТЕКСТ_СООБЩЕНИЯ,
// }

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

