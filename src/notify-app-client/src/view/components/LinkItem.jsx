import React, {useState} from 'react';
import {ListGroup, Button, ButtonGroup} from 'react-bootstrap';
import UpdateProductModal from "./UpdateProductModal";

const LinkItem = ({productModel, onDelete, onUpdate}) => {
    const {productName, productUrl, currentPrice} = productModel;

    const [showModalUpdated, setShowModalUpdated] = useState(false);
    const handleShowUpdate = () => setShowModalUpdated(true);
    const handleCloseUpdate = () => setShowModalUpdated(false);

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
            <ButtonGroup>
                <Button variant="primary" onClick={handleShowUpdate}>Update</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </ButtonGroup>

            <UpdateProductModal show={showModalUpdated}
                                handleClose={handleCloseUpdate}
                                productModel={productModel}
                                onUpdate={onUpdate}/>

        </ListGroup.Item>
    );
};

export default LinkItem;
