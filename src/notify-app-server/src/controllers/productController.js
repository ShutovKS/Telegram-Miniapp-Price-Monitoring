import Product from '../models/product.js';
import User from "../models/user.js";
import UserProduct from "../models/userProduct.js";

class ProductController {
    async get(req, res) {
        try {
            const userId = req.params.userId;

            const user = await User.findOne({where: {user_id: userId}});

            if (!user) {
                console.log('User not found in db ', userId);
                return res.status(404).json({message: 'User not found'});
            }

            const userProducts = await UserProduct.findAll({where: {user_id: userId}});

            const products = await Promise.all(userProducts.map(async (userProduct) => {
                return await Product.findOne({product_url: userProduct.product_id});
            }));

            return res.json(products);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async create(req, res) {
        try {
            const {productUrl, productName} = req.body;
            const userId = req.params.userId;

            const user = await User.findOne({where: {user_id: userId}});

            console.log('User found in db ', user);

            if (!user) {
                console.log('User not found in db ', userId);
                return res.status(404).json({message: 'User not found'});
            }

            const product = await Product.create({
                product_url: productUrl,
                marketplace_id: 'temp',
                current_price: -1,
                last_price: -1
            });

            console.log('Product created in db ', product);

            if(!product) {
                console.log('Product not created in db ', productUrl);
                return res.status(500).json({message: 'Product not created'});
            }

            const userProducts = await UserProduct.create({
                user_id: userId,
                product_id: productUrl,
                product_name: productName
            });

            console.log('UserProduct created in db ', userProducts);

            return res.json(product);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const {productUrl, productName} = req.body;
            const userId = req.params.userId;

            const user = await User.findOne({where: {user_id: userId}});

            if (!user) {
                console.log('User not found in db ', userId);
                return res.status(404).json({message: 'User not found'});
            }

            const userProduct = await UserProduct.findOne({where: {user_id: userId, product_id: productUrl}});

            if (!userProduct) {
                console.log('Product not found in db ', productUrl);
                return res.status(404).json({message: 'Product not found'});
            }

            userProduct.product_name = productName;
            await userProduct.save();

            return res.json(userProduct);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const productUrl = req.params.productUrl;
            const userId = req.params.userId;

            const user = await User.findOne({where: {user_id: userId}});

            if (!user) {
                console.log('User not found in db ', userId);
                return res.status(404).json({message: 'User not found'});
            }

            const userProduct = await UserProduct.findOne({where: {user_id: userId, product_id: productUrl}});

            if (!userProduct) {
                console.log('Product not found in db ', productUrl);
                return res.status(404).json({message: 'Product not found'});
            }

            await userProduct.destroy();

            return res.json({message: 'Product deleted'});
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new ProductController();