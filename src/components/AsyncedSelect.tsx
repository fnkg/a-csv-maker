import React from "react";
import AsyncSelect from "react-select/async";
import { StylesConfig } from "react-select";
import { selectStyles } from "../styles/selectStyles";

type AsyncedSelectProps = {
  loadOptions: (inputValue: string) => Promise<any[]>;
  options?: any[];
  onChange: (value: any) => void;
  value: any;
  placeholder?: string;
  noOptionsMessage?: () => string;
  isDisabled?: boolean;
  isClearable?: boolean;
  className?: string;
};

const AsyncedSelect: React.FC<AsyncedSelectProps> = React.memo(({
  loadOptions,
  options = [],
  onChange,
  value,
  placeholder,
  noOptionsMessage,
  isDisabled = false,
  isClearable = true,
  className = '' }) => {

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
      styles={selectStyles as StylesConfig<{ value: string; label: string }, false>}
    />
  );
});

export default AsyncedSelect;
