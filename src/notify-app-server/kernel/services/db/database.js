import {Sequelize} from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME,        // Имя базы данных
    process.env.DB_USER,        // Имя пользователя
    process.env.DB_PASSWORD,    // Пароль
    {
        host: process.env.DB_HOST, // Хост базы данных
        port: process.env.DB_PORT, // Порт базы данных (по умолчанию 5432)
        dialect: 'postgres',       // Указываем, что используется PostgreSQL
        logging: false,            // Отключаем вывод SQL-запросов в консоль
    }
);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Успешное подключение к базе данных');
    } catch (error) {
        console.error('Ошибка подключения к базе данных:', error);
    }
}

export {sequelize, connectDB};