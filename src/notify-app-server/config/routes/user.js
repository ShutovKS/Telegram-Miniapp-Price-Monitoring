import express from "express";
import UserController from "../../src/controllers/userController.js";

const router = express.Router();

router.post('/', UserController.create);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getOne);

export default router;