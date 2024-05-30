// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Quiz.css'; // Asegúrate de crear este archivo para los estilos personalizados

const Quiz = ({ questions, quizId, onQuizComplete, isLastQuizInGroup }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const storedAttempts = JSON.parse(localStorage.getItem('attempts')) || {};
    if (!storedAttempts[quizId]) {
      storedAttempts[quizId] = [];
    }
    localStorage.setItem('attempts', JSON.stringify(storedAttempts));
  }, [quizId]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      saveAttempt();
      setShowScore(true);
    }
  };

  const saveAttempt = () => {
    const storedAttempts = JSON.parse(localStorage.getItem('attempts')) || {};
    const attempt = {
      date: new Date().toISOString(),
      score,
      total: questions.length,
    };
    if (!storedAttempts[quizId]) {
      storedAttempts[quizId] = [];
    }
    storedAttempts[quizId].push(attempt);
    localStorage.setItem('attempts', JSON.stringify(storedAttempts));
  };

  const handleNext = () => {
    setShowScore(false);  // Reset the score view
    if (onQuizComplete) {
      onQuizComplete();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Container className="mt-5 quiz-container">
      {showScore ? (
        <Card className="text-center card-dark">
          <Card.Body>
            <h2>Tu puntuación: {score} / {questions.length}</h2>
            {isLastQuizInGroup ? (
              <Button as={Link} to="/" variant="primary" className="m-2">
                Volver al Inicio
              </Button>
            ) : (
              <Button onClick={handleNext} variant="primary" className="m-2">
                Siguiente Quiz
              </Button>
            )}
          </Card.Body>
        </Card>
      ) : (
        <Card className="text-center card-dark">
          <Card.Body>
            <h2>{currentQuestion.question}</h2>
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="primary"
                onClick={() => handleAnswer(option === currentQuestion.correctAnswer)}
                className="m-2"
              >
                {option}
              </Button>
            ))}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Quiz;
