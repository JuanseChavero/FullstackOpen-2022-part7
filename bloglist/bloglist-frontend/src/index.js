import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import store from './library/store';
import App from './App';
import './index.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#001E3C',
      paper: '#0A1929',
    },
    divider: 'rgba(194, 224, 255, 0.08)',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
);
