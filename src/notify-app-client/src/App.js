import {useEffect, useState} from "react";
import useTelegram from "./utils/useTelegram";
import Header from "./view/components/Header";
import MainLayout from "./view/components/MainLayout";
import FullscreenLoader from "./view/components/FullscreenLoader";
import ListLinksContainer from "./view/components/ListLinksContainer";
import ProductModel from "./data/models/productModel"; // Исправлено название файла

function App() {
    const {tg} = useTelegram();
    const [productsModel, setProductsModel] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();

                const parsedData = data.map(product => new ProductModel(product));
                setProductsModel(parsedData);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProductsModel([
                    new ProductModel({
                        id: 1,
                        productName: 'Product 1',
                        productUrl: 'https://example.com/product1',
                        currentPrice: 100,
                    })
                ]);
            } finally {
                tg.ready();
                setLoading(false);
            }
        };

        fetchData();
    }, [tg]);

    if (loading) {
        return <FullscreenLoader/>;
    }

    if (!productsModel.length) {
        return <div>No products available</div>;
    }

    return (
        <div>
            <Header/>
            <MainLayout>
                <ListLinksContainer productsModel={productsModel}/>
            </MainLayout>
        </div>
    );
}

export default App;
