import React from 'react';

interface Props {
  handleChange: any;
  values: any;
  id: any;
  value: string;
  disabled: boolean;
  checked: any;
  name: string;
}
const CheckBox: React.FC<Partial<Props>> = ({
  handleChange,
  values,
  id,
  value,
  disabled,
  name
}) => {
  return (
    <input
      type="checkbox"
      onChange={handleChange}
      value={(values && values[name]) || value}
      id={id || name}
      name={name}
      className="cui-field_checkbox lm--checkbox-input"
      disabled={disabled}
      // checked={
      //   checked !== undefined && checked !== null ? checked : values[name]
      // }
    />
  );
};
export default CheckBox;
