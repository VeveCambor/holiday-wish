import React from 'react';
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';


function Card() {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate('/christmas');
  };

  return (
      <div className="card">
        <p>Santa decorated the tree, but he forgot something.</p>
        <p>Can you help him?</p>
        <button className='yes-button' onClick={handleYesClick}>Yes</button>
    </div>
  );
}

export default Card;
