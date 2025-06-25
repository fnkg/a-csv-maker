import React from 'react';

import type { NumberInputProps } from './types';

const NumberInput: React.FC<NumberInputProps> = React.memo(({
  name,
  value,
  onChange,
  placeholder,
  className = '',
}) => {
  return (
    <input
      type="number"
      name={name}
      value={value !== null && value !== undefined ? String(value) : ''}
      onChange={onChange}
      placeholder={placeholder}
      min={0}
      max={999999999}
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
});

NumberInput.displayName = 'NumberInput';

export default NumberInput;
