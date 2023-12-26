import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Button.css'; 

const Button = ({ onPress, text,iconname,buttonStyles,textStyles }) => {

  return (
    <div>
      <button className={buttonStyles} onClick={onPress}>
        {iconname && <FontAwesomeIcon icon={iconname} />} 
        <span className={textStyles}>{text}</span>
      </button>
    </div>
  );
};

export default Button;
