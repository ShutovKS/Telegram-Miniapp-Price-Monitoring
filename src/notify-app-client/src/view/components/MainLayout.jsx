import React from 'react';
import {Container} from 'react-bootstrap';

const MainLayout = ({children}) => {
    return (
        <Container fluid className="bg-black p-2 min-vh-100">
            <Container fluid className="bg-white p-2 rounded-3 min-vh-100">
                {children}
            </Container>
        </Container>
    );
};

export default MainLayout;
