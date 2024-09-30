import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import {handleStartCommand} from './commands.js';
import {COMMANDS} from './constants.js';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;

    switch (message) {
        case COMMANDS.START:
            await handleStartCommand(bot, chatId);
            break;
        default:
            await bot.sendMessage(chatId, 'Команда не распознана.');
    }
});
