import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <p>{label}</p>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.valueAsNumber)}
      />
    </div>
  );
};
