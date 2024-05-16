import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateInputProps {
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
}

export const DateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <p>{label}</p>
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        yearDropdownItemNumber={30}
        scrollableYearDropdown
      />
    </div>
  );
};
