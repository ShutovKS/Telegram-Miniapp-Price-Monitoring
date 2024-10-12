import Product from '../models/product.js';
import User from "../models/user.js";
import UserProduct from "../models/userProduct.js";

class ProductController {
    async get(req, res) {
        try {
            const {userId} = req.params;

            const user = await User.findOne({where: {user_id: userId}});
            if (!user) {
                console.log('User not found in db ', userId);
                return res.status(404).json({message: 'User not found'});
            }

            const userProducts = await UserProduct.findAll({where: {user_id: userId}});
            if (!userProducts) {
                return res.json([]);
            }

            const products = await Promise.all(userProducts.map(
                async (userProduct) => {
                    return await Product.findOne({
                        where: {
                            product_url: userProduct.product_id
                        }
                    });
                }));

            const productsModel = products.map((product) => {
                return {
                    productUrl: product.product_url,
                    productName: userProducts.find((userProduct) => userProduct.product_id === product.product_url).product_name,
                    currentPrice: product.current_price
                };
            });

            return res.json(productsModel);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async create(req, res) {
        try {
            const {productUrl, productName, userId} = req.body;

            const user = await User.findOne({where: {user_id: userId}});
            if (!user) {
                console.log('User not found in db ', userId);
                return res.status(404).json({message: 'User not found'});
            }

            let userProducts = await UserProduct.findOne({where: {user_id: userId, product_id: productUrl}});
            if (userProducts) {
                console.log('Product already exists in db ', productUrl);
                return res.status(409).json({message: 'Product already exists'});
            }

            let product = await Product.findOne({where: {product_url: productUrl}});
            if (!product) {
                product = await Product.create({
                    product_url: productUrl,
                    marketplace_id: 'temp',
                    current_price: -1,
                    last_price: -1
                });
            }

            userProducts = await UserProduct.create({
                user_id: userId,
                product_id: productUrl,
                product_name: productName
            });

            return res.json({
                productUrl: product.product_url,
                productName: userProducts.product_name,
                currentPrice: product.current_price
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const {productUrl, productName, userId} = req.body;

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

            const product = await Product.findOne({where: {product_url: productUrl}});

            return res.json({
                productUrl: productUrl,
                productName: productName,
                currentPrice: product.current_price
            });
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const {userId, productUrl} = req.body;

            console.log(req.params);

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