// src/pages/GroupQuiz.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Quiz from '../components/Quiz';
import './GroupQuiz.css'; // Asegúrate de crear este archivo para los estilos personalizados

const GroupQuiz = ({ groups, quizzes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const group = groups.find((g) => g.id === parseInt(id));

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  useEffect(() => {
    if (!group) {
      navigate('/');
    }
  }, [group, navigate]);

  const handleNextQuiz = () => {
    const nextQuizIndex = currentQuizIndex + 1;
    if (nextQuizIndex < group.quizzes.length) {
      setCurrentQuizIndex(nextQuizIndex);
    } else {
      navigate('/');
    }
  };

  if (!group) {
    return <Container>Grupo no encontrado</Container>;
  }

  const currentQuizId = group.quizzes[currentQuizIndex];
  const currentQuiz = quizzes.find((quiz) => quiz.id === currentQuizId);
  const isLastQuizInGroup = currentQuizIndex === group.quizzes.length - 1;

  return (
    <Container className="mt-5 group-quiz-container">
      {currentQuiz ? (
        <Quiz
          questions={currentQuiz.questions}
          quizId={currentQuiz.id}
          onQuizComplete={handleNextQuiz}
          isLastQuizInGroup={isLastQuizInGroup}
        />
      ) : (
        <Container>Cuestionario no encontrado</Container>
      )}
    </Container>
  );
};

export default GroupQuiz;
