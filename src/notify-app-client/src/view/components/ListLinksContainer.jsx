import React from 'react';
import { ListGroup } from 'react-bootstrap';
import LinkItem from './LinkItem';

const ListLinksContainer = ({ productsModel }) => {
    if (!productsModel.length) {
        return <div>No products available</div>;
    }

    return (
        <ListGroup>
            {productsModel.map((productModel) => (
                <LinkItem key={productModel.id} productModel={productModel} />
            ))}
        </ListGroup>
    );
};

export default ListLinksContainer;
