// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Home.css';  
const Home = () => {
  return (
    <Container className="mt-5 home-container">
      <Row className="text-center mb-4">
        <Col>
          <h2 className="display-4">Bienvenido a QuizQuest</h2>
          <p className="lead">Tu plataforma para gestionar cuestionarios de manera efectiva</p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {[
          { title: 'Crear Cuestionario', link: '/create-quiz' },
          { title: 'Lista de Cuestionarios', link: '/quiz-list' },
          { title: 'Grupos', link: '/groups' },
          { title: 'Notas', link: '/notes' },
          { title: 'Estadísticas', link: '/statistics' }
        ].map((item, idx) => (
          <Col key={idx} md={4} className="mb-4">
            <Card className="text-center shadow-sm border-0 h-100">
              <Card.Body>
                <Card.Title className="mb-3">{item.title}</Card.Title>
                <Button as={Link} to={item.link} variant="primary">Ir</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
