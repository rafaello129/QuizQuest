import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import LineChart from '../components/LineChart';
import './Statistics.css';

const Statistics = ({ quizzes }) => {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    averageScore: 0,
    scores: [],
    labels: []
  });

  useEffect(() => {
    const storedAttempts = JSON.parse(localStorage.getItem('attempts')) || {};
    let totalQuestions = 0;
    let correctAnswers = 0;
    let scores = [];
    let labels = [];

    quizzes.forEach(quiz => {
      const attempts = storedAttempts[quiz.id] || [];
      totalQuestions += quiz.questions.length * attempts.length;
      correctAnswers += attempts.reduce((acc, attempt) => acc + attempt.score, 0);
      scores = [...scores, ...attempts.map(attempt => (attempt.score / attempt.total) * 100)];
      labels = [...labels, ...attempts.map(() => quiz.title)];
    });

    const averageScore = scores.length ? scores.reduce((acc, score) => acc + score, 0) / scores.length : 0;

    setStats({
      totalQuestions,
      correctAnswers,
      averageScore: averageScore.toFixed(2),
      scores,
      labels
    });
  }, [quizzes]);

  const data = {
    labels: stats.labels,
    datasets: [
      {
        label: 'Puntuación (%)',
        data: stats.scores,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      }
    ]
  };

  return (
    <Container className="mt-5 statistics-container">
      <h2 className="text-center">Estadísticas</h2>
      <Card className="mb-3 statistics-card">
        <Card.Body>
          <Card.Title className="text-center">Resumen</Card.Title>
          <Card.Text>Total de Preguntas: {stats.totalQuestions}</Card.Text>
          <Card.Text>Respuestas Correctas: {stats.correctAnswers}</Card.Text>
          <Card.Text>Puntuación Promedio: {stats.averageScore}%</Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3 statistics-card">
        <Card.Body>
          <Card.Title className="text-center">Gráfico de Puntuaciones</Card.Title>
          <LineChart data={data} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Statistics;
