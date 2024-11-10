import React from 'react';
import AsyncSelect from "react-select/async";
import { selectStyles } from '../styles/selectStyles';

const VirtualizedSelect = React.memo(({
  loadOptions,
  options = [],
  onChange,
  value,
  placeholder,
  isDisabled = false,
  isClearable = true,
  className = '' }) => {

  // console.log('%c There are elements in options.', 'color:lime;background:black;', loadOptions)

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      options={options.length > 0 ? options : undefined}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isClearable={isClearable}
      className={className}
      styles={selectStyles}
    />
  );
});

export default VirtualizedSelect;
