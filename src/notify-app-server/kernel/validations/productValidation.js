import {body} from 'express-validator';

export const createProductValidation = [
    body('productUrl', 'Product URL is required').notEmpty(),
    body('productUrl', 'Invalid URL').isURL(),
    body('productUrl', 'Unsupported store').matches(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/),

    body('productName', 'Product name is required').isString(),
    body('productName', 'Product name is required').notEmpty(),
];

export const updateProductValidation = [
    body('productName')
        .isString().withMessage('Product name is required')
        .notEmpty().withMessage('Product name is required'),
];
