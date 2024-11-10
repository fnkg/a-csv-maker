import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerInput = ({ selected, onChange }) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      className="p-[10px] min-h-[40px] border border-gray-300 rounded-[12px] w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      calendarClassName="shadow-lg border border-gray-300"
      popperPlacement="bottom-end" // Расположение выпадающего календаря
      placeholderText="Укажите дату начала действия"
      // showYearDropdown
      // dropdownMode="select"
      // showMonthDropdown
      // useShortMonthInDropdown
    // withPortal
    // fixedHeight
    />
  );
};

export default DatePickerInput;
