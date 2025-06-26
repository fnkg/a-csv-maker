import AsyncedSelect from './AsyncedSelect';
import BasicSelect from './BasicSelect';
import DatePickerInput from './DatePickerInput'
import NumberInput from './NumberInput';

import { filterOptions, getSelectValue } from '@/helpers/utils'
import type { DraftRow, FieldConfig } from '@/helpers/types'
import type { FormProps } from './types';

export default function Form({
  fields,
  newRow,
  selectOptions,
  handleSelectChange,
  handleInputChange,
  handleDateChange,
}: FormProps) {

  const renderField = (f: FieldConfig) => {
    const key = f.name as keyof DraftRow;
    const opts = f.optionsKey ? selectOptions[f.optionsKey] : [];

    switch (f.component) {
      case 'Select':
        return (
          <BasicSelect
            key={f.name}
            placeholder={f.placeholder}
            isMulti={!!f.multiple}
            isDisabled={f.disabled}
            value={getSelectValue(key, newRow, opts, f.multiple)}
            options={opts}
            onChange={(opt) => handleSelectChange(opt, f.name)}
          />
        );

      case 'AsyncSelect':
        return (
          <AsyncedSelect
            key={f.name}
            placeholder={f.placeholder}
            isMulti={!!f.multiple}
            value={getSelectValue(key, newRow, opts, f.multiple)}
            defaultOptions={opts}
            loadOptions={(input) => Promise.resolve(filterOptions(opts, input))}
            noOptionsMessage={() => 'начните вводить текст ⌨️'}
            onChange={(opt) => handleSelectChange(opt, f.name)}
          />
        );

      case 'NumberInput': {
        const rawValue = newRow[key];
        const value = typeof rawValue === 'number' ? rawValue : '';

        return (
          <NumberInput
            key={f.name}
            name={f.name}
            placeholder={f.placeholder}
            value={value}
            onChange={handleInputChange}
            className='number-input'
          />
        );
      }

      case 'DatePicker':
        return (
          <DatePickerInput
            key={f.name}
            selected={newRow[key] ? new Date(newRow[key] as string) : null}
            onChange={handleDateChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {fields.map(renderField)}
    </form>
  );
}