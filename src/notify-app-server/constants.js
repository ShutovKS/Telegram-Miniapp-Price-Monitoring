import dotenv from 'dotenv';

dotenv.config();

export const COMMANDS = {
    START: '/start',
};

export const url = process.env.APP_URL;
