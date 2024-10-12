import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import useTelegram from "../../utils/useTelegram";

const UpdateProductModal = ({show, handleClose, productModel, onUpdate}) => {
    const {userId} = useTelegram();

    const [productName, setProductName] = useState(productModel.productName);

    const handleUpdate = () => {
        onUpdate({productName, productUrl: productModel.productUrl, userId});
        handleClose();
    };

    return (<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Добавить новый товар</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formUserId">
                    <Form.Label>Telegram ID</Form.Label>
                    <Form.Control
                        type="text"
                        className={'text-center'}
                        value={userId}
                        readOnly
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId="formProductName">
                    <Form.Label>Название товара</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите название товара"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        isValid={productName.length > 0}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId="formProductUrl">
                    <Form.Label>URL товара</Form.Label>
                    <Form.Control
                        type="text"
                        className={'text-center'}
                        value={productModel.productUrl}
                        readOnly
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Закрыть
            </Button>
            <Button variant="primary"
                    onClick={handleUpdate}
                    disabled={productName.length === 0}>
                Обновить
            </Button>
        </Modal.Footer>
    </Modal>);
};

export default UpdateProductModal;
