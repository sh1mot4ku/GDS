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
  name = "",
  error = false,
  // required = false add later
}) => {
  return (
    <React.Fragment>
      <FormLabel component="legend">
        {label}
        <span className="required-star">*</span>
      </FormLabel>
      <TextField
        required
        placeholder={placeholder}
        name={name}
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
