import Select, {
  ActionMeta,
  MultiValue,
  SingleValue,
  StylesConfig,
} from 'react-select';

import type { IBasicSelectProps } from './types';
import type { SelectOption } from '@/helpers/types';
import { selectStyles } from '@/styles/selectStyles';

const BasicSelect: React.FC<IBasicSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  isDisabled = false,
  isClearable = true,
  isMulti = false,
  className = '',
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
    <Select<SelectOption, typeof isMulti>
      instanceId="basicSelect"
      isMulti={isMulti}
      options={options}
      value={value as any}
      onChange={handleChange}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isClearable={isClearable}
      className={className}
      styles={selectStyles as StylesConfig<SelectOption, typeof isMulti>}
    />
  );
};

export default BasicSelect;
