import {useEffect, useState} from "react";
import useTelegram from "./utils/useTelegram";
import Header from "./view/components/Header";
import MainLayout from "./view/components/MainLayout";
import FullscreenLoader from "./view/components/FullscreenLoader";
import ListLinksContainer from "./view/components/ListLinksContainer";
import {productApi} from "./http/index.js";

function App() {
    const {tg, userId} = useTelegram();
    const [productsModel, setProductsModel] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await productApi.getProducts(userId);
                setProductsModel(productsData);
            } catch (error) {
                console.error('Error while fetching user data:', error);
            } finally {
                tg.ready();
                setLoading(false);
            }
        };

        fetchData().then();
    }, [tg]);

    if (loading) {
        return <FullscreenLoader/>;
    }

    const handleCreateProduct = (newProduct) => {
        productApi.createProduct(userId, newProduct).then((product) => {
            if (product) {
                setProductsModel([...productsModel, product]);
            }
        });
    };

    const handleDeleteProduct = (productUrl) => {
        productApi.deleteProduct(userId, productUrl).then((success) => {
            if (success) {
                setProductsModel(productsModel.filter((product) => product.productUrl !== productUrl));
            }
        });
    };

    const handleUpdateProduct = (updateProduct) => {
        productApi.updateProduct(userId, updateProduct).then((product) => {
            if (product) {
                setProductsModel(productsModel.map((item) => item.productUrl === product.productUrl ? product : item));
            }
        });
    }

    return (
        <div>
            <Header/>
            <MainLayout>
                <ListLinksContainer
                    productsModel={productsModel}
                    onCreate={handleCreateProduct}
                    onDelete={handleDeleteProduct}
                    onUpdate={handleUpdateProduct}
                />
            </MainLayout>
        </div>
    );
}

export default App;
