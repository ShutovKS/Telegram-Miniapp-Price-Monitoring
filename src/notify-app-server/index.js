import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config()
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Received your message');
});