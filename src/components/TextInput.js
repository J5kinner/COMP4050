import React from "react";
import "../assets/css/textinput.css";

const TextInput = ({ type = "text", label, onChange, value }) => {
  return (
    <div className="input-container">
      <label className={value && "filled"}>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default TextInput;
