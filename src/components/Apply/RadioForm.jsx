import React from "react";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import "./Apply.scss";

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
        <FormLabel component="legend" required>
          {label}
        </FormLabel>
        {options.map((item, index) => (
          <FormControlLabel
            value={item}
            control={<Radio color="primary" required />}
            label={item}
            key={index}
          />
        ))}
      </RadioGroup>
    </React.Fragment>
  );
};

export default RadioForm;
