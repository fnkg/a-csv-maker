import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import "@/src/styles/customDatePicker.css"
import { ru } from 'date-fns/locale/ru';

type DatePickerInputProps = {
  selected: Date | null;
  onChange: (date: Date | null ) => void;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({ selected, onChange }) => {
  return (
    <DatePicker
      className='p-[10px]  focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-1 hover:ring-blue-500'
      dateFormat='yyyy-MM-dd'
      enableTabLoop={false}
      onChange={onChange}
      locale={ru}
      placeholderText='Укажите дату начала действия'
      popperPlacement='bottom-end'
      selected={selected}
      showPopperArrow={false}
    />
  );
};

export default DatePickerInput;
