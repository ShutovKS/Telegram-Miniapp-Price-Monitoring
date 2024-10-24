import {validationResult} from "express-validator";
import ApiError from "../../kernel/services/error/apiError.js";

export default (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return next(ApiError.badRequest('Ошибка валидации', errors.array()));
    }

    next();
}