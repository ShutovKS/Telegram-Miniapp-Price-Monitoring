import React from 'react';
import { ListGroup } from 'react-bootstrap';

const LinkItem = ({ productModel }) => {
    const { productName, productUrl, currentPrice } = productModel;

    return (
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{productName}</div>
                <a href={productUrl} target="_blank" rel="noreferrer">
                    {productUrl}
                </a>
                <div>{`Price: $${currentPrice}`}</div>
            </div>
        </ListGroup.Item>
    );
};

export default LinkItem;
