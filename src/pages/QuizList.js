// src/pages/QuizList.js
import React from 'react';
import { Container, ListGroup, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './QuizList.css'; // Asegúrate de crear este archivo para los estilos personalizados

const QuizList = ({ quizzes }) => {
  return (
    <Container className="mt-5 quiz-list-container">
      <h2 className="text-center">Lista de Cuestionarios</h2>
      <Row className="justify-content-center">
        {quizzes.map((quiz) => (
          <Col key={quiz.id} md={6} lg={4} className="mb-4">
            <Card className="card-dark">
              <Card.Body>
                <Card.Title>{quiz.title}</Card.Title>
                <div className="d-flex justify-content-between">
                  <Button as={Link} to={`/quiz/${quiz.id}`} variant="primary">
                    Ver
                  </Button>
                  <Button as={Link} to={`/edit-quiz/${quiz.id}`} variant="outline-secondary">
                    Editar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default QuizList;
