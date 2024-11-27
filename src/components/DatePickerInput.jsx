import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerInput = ({ selected, onChange }) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat='yyyy-MM-dd'
      className='p-[10px]  focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-1 hover:ring-blue-500'
      calendarClassName='shadow-lg  border-gray-300'
      popperPlacement='bottom-end'
      placeholderText='Укажите дату начала действия'
      enableTabLoop={false}
      // showYearDropdown
      // dropdownMode='select'
      // showMonthDropdown
      // useShortMonthInDropdown
      // withPortal
      // fixedHeight
    />
  );
};

export default DatePickerInput;
