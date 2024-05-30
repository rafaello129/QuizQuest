// src/components/FlashcardForm.js
import React, { useState } from 'react';

const FlashcardForm = ({ addFlashcard }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addFlashcard({ id: Date.now(), question, answer });
    setQuestion('');
    setAnswer('');
  };

  return (
    <form className="flashcard-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Pregunta"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Respuesta"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <button type="submit">Añadir</button>
    </form>
  );
};

export default FlashcardForm;
