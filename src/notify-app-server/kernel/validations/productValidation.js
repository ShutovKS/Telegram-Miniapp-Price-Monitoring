import {body} from 'express-validator';

export const createProductValidation = [
    body('productUrl', 'Product URL is required').notEmpty(),
    body('productUrl', 'Product URL is required').isString(),
    body('productUrl', 'Invalid URL').isURL(),


    body('productName', 'Product name is required').notEmpty(),
    body('productName', 'Product name is required').isString(),
];

export const updateProductValidation = [
    body('productName')
        .isString().withMessage('Product name is required')
        .notEmpty().withMessage('Product name is required'),
];
