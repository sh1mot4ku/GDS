import React, { useEffect, useState } from "react";
import ChipInput from "material-ui-chip-input";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { FormLabel } from "@material-ui/core";

const renderInput = ({
  value,
  onChange,
  chips,
  maxTags,
  placeholder,
  ref,
  error,
  label,
  ...other
}) => (
  <>
    {label && (
      <FormLabel component="legend">
        {label} <span className="required-star">*</span>
      </FormLabel>
    )}
    <ChipInput
      clearInputValueOnChange
      onUpdateInput={onChange}
      inputValue={value}
      value={chips}
      inputRef={ref}
      onBeforeAdd={() => chips.length < maxTags}
      placeholder={placeholder}
      allowDuplicates={false}
      error={error}
      helperText={error && "Please fill out the field"}
      variant="outlined"
      margin="normal"
      className="input"
      {...other}
    />
  </>
);

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion, query);
  const parts = parse(suggestion, matches);

  return (
    <MenuItem
      selected={isHighlighted}
      component="div"
      onMouseDown={(e) => e.preventDefault()} // prevent the click causing the input to be blurred
    >
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <span key={String(index)}>{part.text}</span>
          );
        })}
      </div>
    </MenuItem>
  );
};

const renderSuggestionsContainer = (options) => {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
};

const getSuggestionValue = (suggestion) => suggestion;

const styles = (theme) => ({
  container: {
    flexGrow: 1,
    position: "relative",
    width: "100%",
  },
  suggestionsContainerOpen: {
    position: "absolute",
    marginTop: theme.spacing(-2.5),
    marginBottom: theme.spacing(3),
    left: 0,
    right: 0,
    zIndex: 10,
  },
  suggestion: {
    display: "block",
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  textField: {
    width: "100%",
  },
});

const ReactAutosuggest = ({
  data,
  tags,
  setTags,
  maxSuggestions = 15,
  maxTags = 10,
  label = "",
  placeholder = "",
  maxInputLength = 20,
  error = false,
  classes,
  ...other
}) => {
  const [suggestion, setSuggestion] = useState([]);
  const [textFieldInput, setTextFieldInput] = useState("");

  useEffect(() => {
    data && setSuggestion(data);
  }, [data]);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 || tags.length >= maxTags
      ? []
      : data.filter((suggestion) => {
          const keep =
            count < maxSuggestions &&
            suggestion.toLowerCase().slice(0, inputLength) === inputValue &&
            !tags.includes(suggestion);

          if (keep) {
            count += 1;
          }

          return keep;
        });
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestion(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestion([]);
  };

  const handletextFieldInputChange = (event, { newValue }) => {
    if (newValue.length > maxInputLength) return;
    setTextFieldInput(newValue);
  };

  const handleAddChip = (chip) => {
    if (tags.length >= maxTags) return;
    setTags([...tags, chip]);
    setTextFieldInput("");
  };

  const handleDeleteChip = (chip, index) => {
    tags.splice(index, 1);
    setTags([...tags]);
  };

  return (
    <Autosuggest
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderInputComponent={renderInput}
      suggestions={suggestion}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      renderSuggestionsContainer={renderSuggestionsContainer}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={(e, { suggestionValue }) => {
        handleAddChip(suggestionValue);
        e.preventDefault();
      }}
      focusInputOnSuggestionClick
      inputProps={{
        chips: tags,
        value: textFieldInput,
        maxTags,
        placeholder,
        label,
        error,
        onChange: handletextFieldInputChange,
        onAdd: (chip) => handleAddChip(chip),
        onDelete: (chip, index) => handleDeleteChip(chip, index),
      }}
    />
  );
};

const ChipInputAutosuggest = withStyles(styles)(ReactAutosuggest);

export default ChipInputAutosuggest;
