import type { TemplateKey, FieldConfig, DraftRow, SelectOption, SelectOptions } from '@/helpers/types';
import type { ActionMeta } from 'react-select';

interface IBaseSelectProps {
  className?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isMulti?: boolean;
  isClearable?: boolean;
  value: SelectOption | SelectOption[] | null;
  onChange: (
    value: SelectOption | SelectOption[] | null,
    meta: ActionMeta<SelectOption>
  ) => void;
}

export interface IAsyncedSelectProps extends IBaseSelectProps {
  defaultOptions?: boolean | SelectOption[];
  loadOptions: (inputValue: string) => Promise<SelectOption[]>;
  noOptionsMessage?: () => string;
}

export interface IBasicSelectProps extends IBaseSelectProps {
  options: SelectOption[];
}

export type DatePickerInputProps = {
  selected: Date | null;
  onChange: (date: Date | null) => void;
};

export type NumberInputProps = {
  className?: string;
  placeholder?: string;
  name: string;
  value: number | '';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface FormProps {
  template: TemplateKey;
  fields: FieldConfig[];
  newRow: DraftRow;
  selectOptions: SelectOptions;
  handleSelectChange: (opt: SelectOption | SelectOption[] | null, field: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (d: Date | null) => void;
}