import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateInputProps {
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  dateFormat?: string;
  showYearDropdown?: boolean;
  yearDropdownItemNumber?: number;
  scrollableYearDropdown?: boolean;
}

export const DateInput: React.FC<DateInputProps> = ({ label, value, onChange, dateFormat = "dd/MM/yyyy", showYearDropdown = true, yearDropdownItemNumber = 30, scrollableYearDropdown = true, ...rest }) => {
  return (
    <div>
      <p>{label}</p>
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat={dateFormat}
        showYearDropdown={showYearDropdown}
        yearDropdownItemNumber={yearDropdownItemNumber}
        scrollableYearDropdown={scrollableYearDropdown}
        {...rest}
      />
    </div>
  );
};
