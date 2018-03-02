import React from 'react';

import './style.css';

const Card = ({ text, setEditingMode, showEditButton, isActive, onClick }) => (
  <div onClick={onClick} className={`card ${isActive ? 'active' : ''}`}>
    <p>{text}</p>
    {showEditButton && (
      <button onClick={() => setEditingMode(true)} className="edit-btn">
        Edit
      </button>
    )}
  </div>
);

Card.defaultProps = {
  showEditButton: false,
};

export default Card;
