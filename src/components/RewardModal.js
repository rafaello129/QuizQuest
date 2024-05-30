// src/components/RewardModal.js
import React from 'react';

const RewardModal = ({ show, onClose, reward }) => {
  if (!show) return null;
  
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>¡Recompensa!</h2>
        <p>{reward}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default RewardModal;
