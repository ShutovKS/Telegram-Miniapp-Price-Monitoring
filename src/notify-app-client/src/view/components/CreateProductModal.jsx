import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import useTelegram from "../../utils/useTelegram";

const CreateProductModal = ({show, handleClose, onCreate}) => {
    const {userId} = useTelegram();

    const [productName, setProductName] = useState('');
    const [productUrl, setProductUrl] = useState('');

    const handleCreate = () => {
        onCreate({productName, productUrl, userId});
        setProductName('');
        setProductUrl('');
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
                        placeholder="Введите URL товара"
                        value={productUrl}
                        onChange={(e) => setProductUrl(e.target.value)}
                        isValid={productUrl.length > 0}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Закрыть
            </Button>
            <Button variant="primary"
                    onClick={handleCreate}
                    disabled={productName.length === 0 || productUrl.length === 0}>
                Создать
            </Button>
        </Modal.Footer>
    </Modal>);
};

export default CreateProductModal;
