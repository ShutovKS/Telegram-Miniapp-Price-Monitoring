import host from "./index";
import ProductModel from "../data/models/productModel";

export const getProducts = async (userId) => {
    try {
        const response = await host.get(`api/product/${userId}`);
        return response.data.map((product) => new ProductModel(product));
    } catch (error) {
        console.error('Ошибка при получении списка товаров:', error);
        return [];
    }
}

export const createProduct = async (userId, product) => {
    try {
        const response = await host.post(`api/product/${userId}`, product);
        return new ProductModel(response.data);
    } catch (error) {
        console.error('Ошибка при создании товара:', error);
        return null;
    }
}

export const deleteProduct = async (userId, productUrl) => {
    try {
        await host.delete(`api/product/${userId}/${productUrl}`);
        return true;
    } catch (error) {
        console.error('Ошибка при удалении товара:', error);
        return false;
    }
}

export const updateProduct = async (userId, product) => {
    try {
        const response = await host.put(`api/product/${userId}/${product.productUrl}`, product);
        return new ProductModel(response.data);
    } catch (error) {
        console.error('Ошибка при обновлении товара:', error);
        return null;
    }
}
