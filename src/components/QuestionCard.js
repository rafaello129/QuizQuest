// src/components/QuestionCard.js
import React, { useState } from 'react';

const QuestionCard = ({ question, options, correctAnswer, handleAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleAnswer(selectedAnswer === correctAnswer);
  };

  return (
    <div className="question-card">
      <h2>{question}</h2>
      <form onSubmit={onSubmit}>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              name="option"
              value={option}
              onChange={() => setSelectedAnswer(option)}
            />
            {option}
          </div>
        ))}
        <button type="submit">Responder</button>
      </form>
    </div>
  );
};

export default QuestionCard;
