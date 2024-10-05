import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

const CreateProductModal = ({show, handleClose, onCreate}) => {
    const [productName, setProductName] = useState('');
    const [productUrl, setProductUrl] = useState('');

    const handleCreate = () => {
        onCreate({productName, productUrl});
        setProductName('');
        setProductUrl('');
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новый товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formProductName">
                        <Form.Label>Название товара</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название товара"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formProductUrl">
                        <Form.Label>URL товара</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите URL товара"
                            value={productUrl}
                            onChange={(e) => setProductUrl(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleCreate}>
                    Создать
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateProductModal;
