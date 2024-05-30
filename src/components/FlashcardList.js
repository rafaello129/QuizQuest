// src/components/FlashcardList.js
import React from 'react';
import Flashcard from './Flashcard';

const FlashcardList = ({ flashcards }) => {
  return (
    <div className="flashcard-list">
      {flashcards.map((flashcard) => (
        <Flashcard key={flashcard.id} flashcard={flashcard} />
      ))}
    </div>
  );
};

export default FlashcardList;
