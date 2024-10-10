import axios from 'axios';
import * as userApi from './userApi.js';
import * as productApi from './productApi.js';

const baseURL = process.env.REACT_APP_API_URL;

const host = axios.create({
    baseURL: baseURL,
});

export default host;
export {userApi, productApi};