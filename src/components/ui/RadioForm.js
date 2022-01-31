import React from "react";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import "./ui.scss";

const RadioForm = ({ value, onChange, label, options }) => {
  return (
    <React.Fragment>
      <RadioGroup
        aria-label="radio"
        name="radio"
        value={value}
        onChange={onChange}
        className="radio"
        defaultValue={value}
      >
        <FormLabel component="legend" className="radio-label">
          {label} <span className="required-star">*</span>
        </FormLabel>
        {options.map((item, index) => (
          <FormControlLabel
            value={item}
            control={<Radio color="primary" required />}
            label={item}
            key={item}
            className="radio-option"
          />
        ))}
      </RadioGroup>
    </React.Fragment>
  );
};

export default RadioForm;
