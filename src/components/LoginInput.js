import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/logininput.css';

const CustomInput = ({iconname, placeholder, value, onChange}) => (
  <div>
    <div className="input-with-icon-container">
      <span>
        <FontAwesomeIcon icon={iconname} />
      </span>
      <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  </div>
);

export default CustomInput;
