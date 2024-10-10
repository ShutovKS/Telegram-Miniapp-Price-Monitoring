import express from "express";
import ProductController from "../../src/controllers/productController.js";
import {createProductValidation, updateProductValidation} from "../../kernel/validations/productValidation.js";
import handleValidationErrors from "../../src/middleware/handleValidationErrors.js";

const router = express.Router();

router.get('/:userId', ProductController.get);
router.post('/:userId', createProductValidation, handleValidationErrors, ProductController.create);
router.put('/:userId/:productUrl', updateProductValidation, handleValidationErrors, ProductController.update);
router.delete('/:userId/:productUrl', ProductController.delete);

export default router;
