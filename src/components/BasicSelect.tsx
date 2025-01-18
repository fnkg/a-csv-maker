import Select from "react-select";
import { StylesConfig } from "react-select";
import { selectStyles } from "../styles/selectStyles";
import { OptionType } from '@/src/utils/types';

type BasicSelectProps = {
  options: OptionType[];
  onChange: (value: OptionType | null) => void;
  value: OptionType | null;
  placeholder?: string;
  isDisabled?: boolean;
  isClearable?: boolean;
  className?: string;
};

const BasicSelect: React.FC<BasicSelectProps> = ({
  options,
  onChange,
  value,
  placeholder,
  isDisabled = false,
  isClearable = true,
  className = ''
}) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isClearable={isClearable}
      className={className}
      styles={selectStyles as StylesConfig<{ value: string; label: string }, false>}
    />
  );
};

export default BasicSelect;
