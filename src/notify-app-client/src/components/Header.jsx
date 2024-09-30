import React from 'react';
import useTelegram from "../hooks/useTelegram";
import {Button, Col, Container, Navbar, Row, Image} from "react-bootstrap";
import {FaTimes} from 'react-icons/fa';
import {appName} from "../config/constants";

const Header = () => {
    const {close, user} = useTelegram();

    return (
        <Navbar expand="lg" bg="dark" className="py-3">
            <Container>
                <Row className="w-100 align-items-center">
                    {/* Левая часть - кнопка закрытия */}
                    <Col xs={4} className="d-flex justify-content-start">
                        <Button variant="outline-light" onClick={close} className="d-flex align-items-center">
                            <FaTimes size={20}/>
                            <span className="ms-2 d-none d-sm-inline">Close</span>
                        </Button>
                    </Col>

                    {/* Центральная часть - название приложения */}
                    <Col xs={4} className="text-center">
                        <Navbar.Brand className="text-light fw-bold">
                            {appName}
                        </Navbar.Brand>
                    </Col>

                    {/* Правая часть - информация о пользователе */}
                    <Col xs={4} className="d-flex justify-content-end align-items-center">
                        <Navbar.Brand className="text-light">
                            {user?.username || 'User name'}
                        </Navbar.Brand>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
};

export default Header;
