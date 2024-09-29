import { url } from './constants.js';

// Обработчик команды /start
export const handleStartCommand = async (bot, chatId) => {
    try {
        await bot.sendMessage(chatId, 'Привет! Я бот, который может открыть для вас веб-приложение. Нажмите кнопку ниже, чтобы открыть веб-приложение.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Открыть веб-приложение', web_app: { url: `${url}` } }]
                ]
            }
        });
    } catch (error) {
        console.error(`Error handling /start: ${error.message}`);
    }
};