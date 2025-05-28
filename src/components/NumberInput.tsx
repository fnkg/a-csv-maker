import React from 'react';

type NumberInputProps = {
  name: string;
  value: number | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

const NumberInput: React.FC<NumberInputProps> = React.memo(({
  name,
  value,
  onChange,
  placeholder,
  className
}) => {
  return (
    <>
      <input
        type="number"
        name={name}
        value={value ? String(value) : ''}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        min={0}
        max={999999999}
      />
    </>
  );
});

NumberInput.displayName = 'NumberInput';

export default NumberInput;
