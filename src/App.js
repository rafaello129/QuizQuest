// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import QuizList from './pages/QuizList';
import Groups from './pages/Groups';
import Notes from './pages/Notes';
import Statistics from './pages/Statistics';
import Quiz from './components/Quiz';
import GroupQuiz from './pages/GroupQuiz'; // Importa el nuevo componente
import './App.css';

const App = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setQuizzes(storedQuizzes);
    setGroups(storedGroups);
  }, []);

  useEffect(() => {
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const addQuiz = (quiz) => {
    setQuizzes([...quizzes, quiz]);
  };

  const updateQuiz = (updatedQuiz) => {
    const updatedQuizzes = quizzes.map((quiz) => (quiz.id === updatedQuiz.id ? updatedQuiz : quiz));
    setQuizzes(updatedQuizzes);
  };

  const addGroup = (group) => {
    setGroups([...groups, group]);
  };

  const updateGroup = (updatedGroup) => {
    const updatedGroups = groups.map((group) => (group.id === updatedGroup.id ? updatedGroup : group));
    setGroups(updatedGroups);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-quiz" element={<CreateQuiz addQuiz={addQuiz} quizzes={quizzes} />} />
          <Route path="/edit-quiz/:id" element={<CreateQuiz addQuiz={addQuiz} updateQuiz={updateQuiz} quizzes={quizzes} />} />
          <Route path="/quiz-list" element={<QuizList quizzes={quizzes} />} />
          <Route path="/groups" element={<Groups groups={groups} addGroup={addGroup} updateGroup={updateGroup} quizzes={quizzes} />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/statistics" element={<Statistics quizzes={quizzes} />} />
          <Route path="/quiz/:id" element={<QuizElement quizzes={quizzes} />} />
          <Route path="/group-quiz/:id" element={<GroupQuiz groups={groups} quizzes={quizzes} />} /> {/* Nueva ruta */}
        </Routes>
      </div>
    </Router>
  );
};

const QuizElement = ({ quizzes }) => {
  const { id } = useParams();
  const quiz = quizzes.find((q) => q.id === parseInt(id));
  
  const singleQuizGroup = {
    id: parseInt(id),
    name: quiz?.title || 'Quiz',
    quizzes: [parseInt(id)],
  };

  return quiz ? (
    <GroupQuiz groups={[singleQuizGroup]} quizzes={quizzes} />
  ) : (
    <div>Cuestionario no encontrado</div>
  );
};

export default App;
