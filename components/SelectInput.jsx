import React from 'react';
import Select from 'react-select';
import Async from "react-select/async";

const customStyles = {
  menu: (base) => ({
    ...base,
    borderRadius: '16px'
  }),

  menuList: (base) => ({
    ...base,
    borderRadius: '16px',
    '::-webkit-scrollbar': {
      width: '12px',
      height: '12px',
    },
    '::-webkit-scrollbar-track': {
      background: 'tranparent',
      margin: '7.5px',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 0, 0, 0.08)',
      borderRadius: '16px',
      cursor: 'pointer',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: 'rgba(0, 0, 0, 0.08)',
    },
  }),

  option: (defaultStyles, state) => ({
    ...defaultStyles,
    color: state.isSelected ? 'rgb(14, 13, 71)' : 'rgb(14, 13, 71)',
    backgroundColor: state.isSelected ? '#eef4ff' : 'white', // фон при выборе
    ':hover': {
      backgroundColor: '#eef4ff', // фон при наведении
    },
    padding: '10px',
    fontSize: '15px',
    cursor: 'pointer',
  }),

  control: (defaultStyles, state) => ({
    ...defaultStyles,
    // backgroundColor: 'white',
    // border: state.isFocused ? '2px solid #0354f1' : '1px solid #d1d5db', // граница изменяется при фокусе
    borderRadius: '12px',
    // boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
    ':hover': {
      borderColor: '#3b82f6',
    },
    padding: '2px',
    minHeight: '40px',
  }),

  singleValue: (defaultStyles) => ({
    ...defaultStyles,
    color: '#1f2937', // темный текст
  }),

  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#9ca3af', // серый текст плейсхолдера
  }),

  dropdownIndicator: (defaultStyles) => ({
    ...defaultStyles,
    color: '#3b82f6', // синий индикатор стрелки
    ':hover': {
      color: '#3b82f6', // такой же при наведении
    },
  }),

  indicatorSeparator: () => ({
    display: 'none', // убрать разделитель перед стрелкой
  }),

  clearIndicator: (defaultStyles) => ({
    ...defaultStyles,
    color: '#cccccc',
    ':hover': {
      color: '#0e0d47'
    },
  }),
};


const SelectInput = ({ options, onChange, value, placeholder, isDisabled = false, isClearable = true, className = '' }) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isClearable={isClearable}
      className={className}
      styles={customStyles}
    />
  );
};

export default SelectInput;
