import Select from 'react-select';
import { selectStyles } from '../styles/selectStyles';

const BasicSelect = ({ options, onChange, value, placeholder, isDisabled = false, isClearable = true, className = '' }) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isClearable={isClearable}
      className={className}
      styles={selectStyles}
    />
  );
};

export default BasicSelect;
