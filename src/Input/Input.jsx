import React from "react";
import "../Form/Form.css";

const stlyesValidation = (error, messageError) => {
  let valid;

  if (error === undefined && messageError === undefined) {
    valid = "form-group";
  }

  if (error && messageError) {
    valid = "form-group form-group-incorrect";
  }

  if (!error && messageError === null) {
    valid = "form-group form-group-correct";
  }

  return valid;
};

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type,
  id,
  className,
  error,
  messageError,
  name
}) => {
  const handleOnChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className={stlyesValidation(error, messageError)}>
      <label htmlFor={id}> {label} </label>
      <input
        className={className}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
        name={name}
      />
      {messageError && <small> {messageError} </small>}
    </div>
  );
};
export default Input;
