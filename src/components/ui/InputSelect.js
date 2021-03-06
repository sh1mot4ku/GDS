import React from "react";
import { FormLabel, TextField, MenuItem } from "@material-ui/core";
import "./ui.scss";

const InputSelect = ({
  label,
  placeholder,
  type,
  onChange,
  value,
  options,
}) => {
  return (
    <React.Fragment>
      <FormLabel component="legend">
        {label} <span className="required-star">*</span>
      </FormLabel>
      <TextField
        required
        select
        placeholder={placeholder}
        variant="outlined"
        margin="normal"
        className="input"
        size="small"
        type={type}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    </React.Fragment>
  );
};

export default InputSelect;
