import React from "react";
import AsyncSelect from "react-select/async";
import { selectStyles } from "../styles/selectStyles";

const AsyncedSelect = React.memo(({
  loadOptions,
  options = [],
  onChange,
  value,
  placeholder,
  noOptionsMessage,
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
      noOptionsMessage={noOptionsMessage}
      isDisabled={isDisabled}
      isClearable={isClearable}
      className={className}
      styles={selectStyles}
    />
  );
});

export default AsyncedSelect;
