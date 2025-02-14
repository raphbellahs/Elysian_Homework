import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { colors, images, icons } from '../assets';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

// Custom styled components
const RegisterContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  minHeight: '100vh',
  backgroundColor: colors.primary,
  position: 'relative',
}));

const LogoContainer = styled(Box)({
  position: 'absolute',
  top: '2rem',
  left: '2rem',
  zIndex: 1,
});

const IllustrationSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  color: colors.white,
});

const FormSection = styled(Box)({
  backgroundColor: colors.white,
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '20px 0 0 20px',
});

const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '8px 20px',
  textTransform: 'none',
  flex: 1,
  margin: '0 8px',
  border: `1px solid ${colors.gray}`,
  '&:hover': {
    backgroundColor: colors.gray,
  },
}));

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success' or 'error'
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.email || !formData.password || !formData.username) {
      setSnackbar({
        open: true,
        message: 'Please fill in all fields',
        severity: 'error'
      });
      return;
    }

    try {
      setLoading(true);
      
      const response = await register(formData);
      
      // Show success message with welcome message
      setSnackbar({
        open: true,
        message: response.welcomeMessage || 'Registration successful!',
        severity: 'success'
      });

      // Clear form
      setFormData({ username: '', email: '', password: '' });

      // Navigate to login after success
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <RegisterContainer>
      <LogoContainer>
        <img src={images.logo} alt="Logo" style={{ width: 40, height: 40 }} />
      </LogoContainer>

      {/* Left side - Illustration and welcome message */}
      <IllustrationSection>
        <Box sx={{ width: '300px', mb: 4 }}>
          <img 
            src={images.welcomeIllustration}
            alt="Welcome"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
        <Typography variant="h4" gutterBottom>
          Welcome aboard my friend
        </Typography>
        <Typography variant="body1">
          just a couple of clicks and we start
        </Typography>
      </IllustrationSection>

      {/* Right side - Register form */}
      <FormSection>
        <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto', position: 'relative' }}>
          <Typography variant="h5" sx={{ mb: 4, textAlign: 'center', color: colors.primary }}>
            Create Account
          </Typography>

          {/* Loading Overlay */}
          {loading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 1,
              }}
            >
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Creating your account...</Typography>
            </Box>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username field */}
            <TextField
              fullWidth
              name="username"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img src={icons.user} alt="user" style={{ width: 20, height: 20 }} />
                  Username
                </Box>
              }
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
              disabled={loading}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />

            {/* Email field */}
            <TextField
              fullWidth
              name="email"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img src={icons.mail} alt="mail" style={{ width: 20, height: 20 }} />
                  Email
                </Box>
              }
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
              disabled={loading}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />

            {/* Password field */}
            <TextField
              fullWidth
              name="password"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img src={icons.lock} alt="lock" style={{ width: 20, height: 20 }} />
                  Password
                </Box>
              }
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: 2 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Register button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                mb: 3,
                borderRadius: 2,
                py: 1.5,
                backgroundColor: colors.primary,
                '&:hover': {
                  backgroundColor: colors.primaryDark,
                },
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Registering...
                </Box>
              ) : (
                'Register'
              )}
            </Button>

            {/* Social registration section */}
            <Box sx={{ mb: 3 }}>
              <Typography align="center" color="textSecondary" sx={{ mb: 2 }}>
                Or register with
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <SocialButton>
                  <icons.google />
                  <Box component="span" sx={{ ml: 1 }}>Google</Box>
                </SocialButton>
                <SocialButton>
                  <icons.facebook />
                  <Box component="span" sx={{ ml: 1 }}>Facebook</Box>
                </SocialButton>
              </Box>
            </Box>

            {/* Login link */}
            <Typography align="center" color="textSecondary">
              Already have an account?{' '}
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  textTransform: 'none',
                  color: colors.primary,
                  p: 0,
                  minWidth: 'auto',
                  verticalAlign: 'baseline',
                  fontWeight: 'medium',
                  '&:hover': {
                    background: 'none',
                    textDecoration: 'underline',
                  }
                }}
              >
                Log in
              </Button>
            </Typography>
          </form>
        </Box>
      </FormSection>

      {/* Toast Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </RegisterContainer>
  );
} 