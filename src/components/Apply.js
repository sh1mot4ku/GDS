import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  TextField,
	Button,
} from "@material-ui/core";
import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E40F6',
    },
  },
});

function Apply() {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
		<ThemeProvider theme={theme}>
      <Grid container direction="row">
        <Grid item xs={4} style={{ height: "100vh", background: "#1E40F6" }}></Grid>
        <Grid item xs={8} container justifyContent="center" alignItems="center">
          <FormControl component="fieldset">
            <FormLabel component="legend" required >FULL NAME</FormLabel>
            <TextField
              id="outlined-disabled"
              label="YOUR NAME"
              placeholder="FULL NAME"
              multiline
              variant="outlined"
							margin="normal"
            />
						<FormLabel component="legend" required >EMAIL</FormLabel>
            <TextField
              id="outlined-disabled"
              label="Email Address"
              placeholder="Email Address"
              multiline
              variant="outlined"
							margin="normal"
							autoComplete="email"
            /><FormLabel component="legend" required >PASSWORD</FormLabel>
            <TextField
              id="outlined-disabled"
              label="PASSWORD"
              placeholder="Password"
              multiline
              variant="outlined"
              margin="normal"
            /><FormLabel component="legend" required >LOCATION</FormLabel>
            <TextField
              id="outlined-disabled"
              label="Location"
              placeholder="Location"
              multiline
              variant="outlined"
              margin="normal"
            />

            <FormLabel component="legend" required >LOOKING FOR</FormLabel>
            <RadioGroup
              aria-label="radio"
              name="radio"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="FULL-TIME EMPLOYMENT"
                control={<Radio color="primary" />}
                label="FULL-TIME EMPLOYMENT"
              />
              <FormControlLabel
                value="CONTRACT / FREELANCE JOBS"
                control={<Radio color="primary" />}
                label="CONTRACT / FREELANCE JOBS"
              />
              <FormControlLabel
                value="BOTH PERMANENT AND CONTRACT"
                control={<Radio color="primary" />}
                label="BOTH PERMANENT AND CONTRACT"
              />
            </RadioGroup>
						<Button  color='primary' variant="contained" >next</Button>
          </FormControl>
        </Grid>
      </Grid>
			</ThemeProvider>
    </>
  );
}

export default Apply;
