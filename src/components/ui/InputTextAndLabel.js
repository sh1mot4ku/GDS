import React from "react";
import { FormLabel, TextField } from "@material-ui/core";
import "./ui.scss";

const InputTextAndLabel = ({
  label,
  placeholder,
  type = "text",
  onChange,
  value,
  inputProps = {},
  multiline = false,
  minRows = 1,
  maxRows = 1,
  error = false,
}) => {
  return (
    <React.Fragment>
      <FormLabel component="legend">
        {label} <span className="required-star">*</span>
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
        inputProps={inputProps}
        multiline={multiline}
        minRows={minRows}
        maxRows={maxRows}
        error={error}
      />
    </React.Fragment>
  );
};

export default InputTextAndLabel;