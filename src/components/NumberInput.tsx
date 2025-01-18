import React from "react";

type NumberInputProps = {
  name: string;
  value: number | string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

const NumberInput: React.FC<NumberInputProps> = React.memo(({ 
  name, 
  value, 
  onChange, 
  onKeyDown, 
  placeholder, 
  className 
}) => {
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
