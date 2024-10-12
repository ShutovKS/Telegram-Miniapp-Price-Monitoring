import React, {useState} from 'react';
import {ListGroup, Button, Col, Row, Container} from 'react-bootstrap';
import LinkItem from './LinkItem';
import CreateProductModal from './CreateProductModal';

const ListLinksContainer = ({productsModel, onCreate, onDelete, onUpdate}) => {
    const [showModalCreated, setShowModalCreated] = useState(false);

    const handleShowCreate = () => setShowModalCreated(true);
    const handleCloseCreate = () => setShowModalCreated(false);

    return (
        <div>
            <h1 className={'text-center'}>Список товаров</h1>
            <br/>

            {productsModel.length === 0 ? (
                <Container>
                    <Row>
                        <Col className={'text-center'}>
                            <h3>Список товаров пуст</h3>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <ListGroup>
                    {productsModel.map((productModel) => (
                        <LinkItem key={productModel.productUrl}
                                  productModel={productModel}
                                  onUpdate={onUpdate}
                                  onDelete={onDelete}/>
                    ))}
                </ListGroup>
            )}

            {/* Вызов модального окна */}
            <CreateProductModal show={showModalCreated} handleClose={handleCloseCreate} onCreate={onCreate}/>

            <Container className={'text-center'}>
                <br/>
                <Button variant="primary" size="lg" onClick={handleShowCreate}>Добавить товар</Button>
            </Container>
        </div>
    );
};

export default ListLinksContainer;
