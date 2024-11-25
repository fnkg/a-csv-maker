import React from 'react';

const NumberInput = React.memo(({ name, value, onChange, onKeyDown, placeholder, className }) => {
  return (
    <input
      type='number'
      name={name}
      value={value !== undefined ? value : ''}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={className}
    />
  );
});

export default NumberInput;