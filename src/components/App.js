import { createTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import AppRouter from '../router/AppRouter';
import { JobListingsProvider } from '../context/jobListing-context';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E40F6"
    }
  }
})

const App = () => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <JobListingsProvider>
        <AppRouter />
      </JobListingsProvider>
    </ThemeProvider>
  </React.Fragment>
)

export default App