import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';

import type { DatePickerInputProps } from './types';
import 'react-datepicker/dist/react-datepicker.min.css';
import '@/styles/global.css';
import '@/styles/customDatePicker.css';

const DatePickerInput: React.FC<DatePickerInputProps> = ({ selected, onChange }) => {
  return (
    <DatePicker
      className='p-[10px]  focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-1 hover:ring-blue-500'
      dateFormat='yyyy-MM-dd'
      enableTabLoop={false}
      onChange={onChange}
      locale={ru}
      placeholderText='Дата начала действия'
      popperPlacement='bottom-end'
      selected={selected}
      showPopperArrow={false}
    />
  );
};

export default DatePickerInput;
