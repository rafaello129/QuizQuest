// src/components/Flashcard.js
import React, { useState } from 'react';

const Flashcard = ({ flashcard, checkAnswer }) => {
  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAnswer(flashcard.id, userAnswer);
    setUserAnswer('');
  };

  return (
    <div className="flashcard">
      <div className="flashcard-question">
        <h2>{flashcard.question}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tu respuesta"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          required
        />
        <button type="submit">Responder</button>
      </form>
    </div>
  );
};

export default Flashcard;
