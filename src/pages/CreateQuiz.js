// src/pages/CreateQuiz.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './CreateQuiz.css'; // Asegúrate de crear este archivo para los estilos personalizados

const CreateQuiz = ({ addQuiz, updateQuiz, quizzes }) => {
  const { id } = useParams();
  const isEditing = id !== undefined;
  const existingQuiz = quizzes.find(quiz => quiz.id === parseInt(id)) || { title: '', questions: [] };

  const [title, setTitle] = useState(existingQuiz.title);
  const [questions, setQuestions] = useState(existingQuiz.questions);

  useEffect(() => {
    if (isEditing) {
      setTitle(existingQuiz.title);
      setQuestions(existingQuiz.questions);
    }
  }, [isEditing, existingQuiz]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const quiz = { id: isEditing ? parseInt(id) : Date.now(), title, questions };
    if (isEditing) {
      updateQuiz(quiz);
    } else {
      addQuiz(quiz);
    }
    setTitle('');
    setQuestions([]);
  };

  return (
    <Container className="mt-5 create-quiz-container">
      <h2 className="text-center">{isEditing ? 'Editar Cuestionario' : 'Crear Cuestionario'}</h2>
      <Form onSubmit={handleSubmit} className="form-centered">
        <Card className="mb-4 card-dark">
          <Card.Body>
            <Form.Group controlId="quizTitle">
              <Form.Label>Título del Cuestionario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Título del Cuestionario"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-control-dark"
              />
            </Form.Group>
          </Card.Body>
        </Card>
        {questions.map((q, qIndex) => (
          <Card key={qIndex} className="mb-4 card-dark">
            <Card.Body>
              <Form.Group controlId={`question${qIndex}`}>
                <Form.Label>Pregunta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Pregunta"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  required
                  className="form-control-dark"
                />
              </Form.Group>
              {q.options.map((option, oIndex) => (
                <Form.Group key={oIndex} controlId={`question${qIndex}option${oIndex}`}>
                  <Form.Label>Opción {oIndex + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={`Opción ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    required
                    className="form-control-dark"
                  />
                </Form.Group>
              ))}
              <Form.Group controlId={`correctAnswer${qIndex}`}>
                <Form.Label>Respuesta Correcta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Respuesta Correcta"
                  value={q.correctAnswer}
                  onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                  required
                  className="form-control-dark"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        ))}
        <div className="text-center">
          <Button variant="secondary" onClick={addQuestion} className="mt-3 mb-3">
            Añadir Pregunta
          </Button>
          <Button variant="primary" type="submit" className="d-block mx-auto">
            {isEditing ? 'Actualizar Cuestionario' : 'Guardar Cuestionario'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateQuiz;
