import host from "./index";
import UserModel from "../data/models/userModel";

export const getUser = async (userId) => {
    try {
        const response = await host.get(`api/user/${userId}`);
        return new UserModel(
            {
                userId: response.data.user_id,
                chatId: response.data.chat_id,
                username: response.data.username,
            }
        );
    } catch (error) {
        console.error('Ошибка при получении пользователя:', error);
        return null;
    }
}