import React from 'react';
import { ChromePicker } from 'react-color';
import "./styles.css"

const ColorPicker = ({ color, onChange }) => {
  return (
    <div className="color-picker">
      <ChromePicker color={color} onChange={(color) => onChange(color.hex)} />
    </div>
  );
};

export default ColorPicker;
