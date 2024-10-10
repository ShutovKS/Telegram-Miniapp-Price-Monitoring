import React, {useState} from 'react';
import {ListGroup, Button, Col, Row, Container} from 'react-bootstrap';
import LinkItem from './LinkItem';
import CreateProductModal from './CreateProductModal';

const ListLinksContainer = ({productsModel, onCreate, onDelete}) => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div>
            <h1 className={'text-center'}>Список товаров</h1>
            <br/>

            {productsModel.length === 0 ? (
                <Container>
                    <Row>
                        <Col className={'text-center'} >
                            <h3>Список товаров пуст</h3>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <ListGroup>
                    {productsModel.map((productModel) => (
                        <LinkItem key={productModel.productUrl} productModel={productModel} onDelete={onDelete}/>
                    ))}
                </ListGroup>
            )}

            {/* Вызов модального окна */}
            <CreateProductModal show={showModal} handleClose={handleClose} onCreate={onCreate}/>

            <Container className={'text-center'}>
                <br/>
                <Button variant="primary" size="lg" onClick={handleShow}>Добавить товар</Button>
            </Container>
        </div>
    );
};

export default ListLinksContainer;
