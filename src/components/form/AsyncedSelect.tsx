import React from 'react';
import AsyncSelect from 'react-select/async';
import {
  StylesConfig,
  ActionMeta,
  MultiValue,
  SingleValue,
} from 'react-select';

import type { IAsyncedSelectProps } from './types'
import type { SelectOption } from '@/helpers/types';
import { selectStyles } from '@/styles/selectStyles';

const AsyncedSelect: React.FC<IAsyncedSelectProps> = React.memo(
  ({
    loadOptions,
    className = '',
    placeholder,
    value,
    isDisabled = false,
    isMulti = false,
    isClearable = true,
    defaultOptions = true,
    onChange,
    noOptionsMessage,
  }) => {
    const handleChange = (
      option: MultiValue<SelectOption> | SingleValue<SelectOption>,
      meta: ActionMeta<SelectOption>
    ) => {
      if (isMulti) {
        onChange(option as SelectOption[], meta);
      } else {
        onChange(option as SelectOption | null, meta);
      }
    };

    return (
      <AsyncSelect<SelectOption, typeof isMulti>
        loadOptions={loadOptions}
        className={className}
        placeholder={placeholder}
        value={value as any}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isClearable={isClearable}
        defaultOptions={defaultOptions}
        onChange={handleChange}
        noOptionsMessage={noOptionsMessage}
        styles={selectStyles as StylesConfig<SelectOption, typeof isMulti>}
        cacheOptions
        instanceId="asyncSelect"
      />
    );
  }
);

AsyncedSelect.displayName = 'AsyncedSelect';

export default AsyncedSelect;
