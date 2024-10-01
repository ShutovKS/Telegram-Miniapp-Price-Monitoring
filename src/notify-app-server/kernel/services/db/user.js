// services/userService.js
import User from '../../../src/models/user.js';

export function registerUser(userId, username, chatId) {
    return User.create({
        telegram_id: userId,
        chat_id: chatId,
        username: username,
    }).then(user => {
        console.log('User created successfully:', user);
        return user;
    }).catch(error => {
        console.error('Error creating user:', error);
        throw error;
    });
}
