import React from 'react';
import AsyncSelect from 'react-select/async';
import { OptionType } from '@/src/helpers/types';
import { StylesConfig } from 'react-select';
import { selectStyles } from '../styles/selectStyles';

type AsyncedSelectProps = {
  loadOptions: (inputValue: string) => Promise<OptionType[]>;
  options?: OptionType[];
  onChange: (value: OptionType | null) => void;
  value: OptionType | null;
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
      instanceId="asyncSelect"
    />
  );
});

AsyncedSelect.displayName = 'AsyncedSelect';

export default AsyncedSelect;
