// services/userService.js
import User from '../../../src/models/user.js';

export async function registerUser(userId, username, chatId) {
    return await User.create({
        user_id: userId,
        chat_id: chatId,
        username: username,
    });
}
