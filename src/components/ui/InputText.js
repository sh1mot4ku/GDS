import React from "react";
import { TextField } from "@material-ui/core";
import "./ui.scss";

const InputText = ({ placeholder, type, onChange, value, isRequired }) => {
  return (
    <React.Fragment>
      <TextField
        required={isRequired}
        placeholder={placeholder}
        variant="outlined"
        className="input-small"
        size="small"
        type={type}
        onChange={onChange}
        value={value}
      />
    </React.Fragment>
  );
};

export default InputText;
