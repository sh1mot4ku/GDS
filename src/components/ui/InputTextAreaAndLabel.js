import React from "react";
import { FormLabel, TextField } from "@material-ui/core";
import "./ui.scss";

const InputTextAndLabel = ({
  label,
  placeholder,
  type,
  onChange,
  value,
  name,
}) => {
  return (
    <React.Fragment>
      <FormLabel component="legend">
        {label} <span className="required-star">*</span>
      </FormLabel>
      <TextField
        required
        multiline
        variant="outlined"
        margin="normal"
        className="text-area"
        rows={4}
        size="small"
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        name={name}
      />
    </React.Fragment>
  );
};

export default InputTextAndLabel;
