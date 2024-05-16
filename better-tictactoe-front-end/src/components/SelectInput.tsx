import React from 'react';

interface SelectInputProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const SelectInput: React.FC<SelectInputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <p>{label}</p>
      <select value={value ? 'yes' : 'no'} onChange={(e) => onChange(e.target.value === 'yes')}>
        <option value="no">no</option>
        <option value="yes">si</option>
      </select>
    </div>
  );
};
