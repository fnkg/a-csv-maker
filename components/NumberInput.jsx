import React from 'react';

const NumberInput = ({ name, value, onChange, onKeyDown, placeholder, className }) => {
  return (
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default NumberInput;
