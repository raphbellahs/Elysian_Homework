import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './pages/LoginPage';
import RegisterForm from './pages/RegisterForm';
import { colors } from './assets';

// Create theme with our brand colors
const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
    },
    background: {
      default: colors.white,
    },
    text: {
      secondary: colors.textSecondary,
    },
  },
  typography: {
    fontFamily: '"Lato", sans-serif',
    h4: {
      fontWeight: 600,
      fontFamily: '"Lato", sans-serif',
    },
    h5: {
      fontWeight: 600,
      fontFamily: '"Lato", sans-serif',
    },
    body1: {
      fontFamily: '"Lato", sans-serif',
    },
    button: {
      fontFamily: '"Lato", sans-serif',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontFamily: '"Lato", sans-serif',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontFamily: '"Lato", sans-serif',
            '&:hover fieldset': {
              borderColor: colors.primary,
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: '"Lato", sans-serif',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App; 