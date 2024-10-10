import React from 'react';
import {ListGroup, Button} from 'react-bootstrap';

const LinkItem = ({productModel, onDelete}) => {
    const {productName, productUrl, currentPrice} = productModel;

    const handleDelete = () => {
        onDelete(productModel.productUrl);
    };

    return (
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{productName}</div>
                <a href={productUrl} target="_blank" rel="noreferrer">
                    {productUrl}
                </a>
                <div>{`Price: $${currentPrice}`}</div>
            </div>
            <Button variant="danger" onClick={handleDelete}>Удалить</Button>
        </ListGroup.Item>
    );
};

export default LinkItem;
