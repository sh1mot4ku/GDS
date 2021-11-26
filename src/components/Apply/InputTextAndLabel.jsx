import React from "react";
import { FormLabel, TextField } from "@material-ui/core";
import "./Apply.scss";

const InputTextAndLabel = ({
  label,
  placeholder,
  type,
  onChange,
  value,
  name,
  // onBlur,
}) => {
  return (
    <React.Fragment>
      <FormLabel component="legend" required>
        {label}
      </FormLabel>
      <TextField
        required
        placeholder={placeholder}
        variant="outlined"
        margin="normal"
        className="input"
        size="small"
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        // onBlur={onBlur}
      />
    </React.Fragment>
  );
};

export default InputTextAndLabel;
