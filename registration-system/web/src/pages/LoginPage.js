import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { colors, images, icons } from '../assets';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../api';

// Custom styled components
const LoginContainer = styled(Box)(({ theme }) => ({
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

const LoginPage = () => {
  // State management
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Event handlers
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });
      
      // Show success toast with API message
      toast.success(response.message || 'Login successful!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear form data after successful login
      setFormData({
        email: '',
        password: '',
      });

    } catch (error) {
      // Show error toast with API error message
      toast.error(error.response?.data?.message || error.message || 'Login failed', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <LoginContainer>
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

      {/* Right side - Login form */}
      <FormSection>
        <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
          <Typography variant="h5" sx={{ mb: 4, textAlign: 'center',color: colors.primary}}>
            Log in
          </Typography>

          <form onSubmit={handleSubmit}>
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
              InputProps={{
                sx: { borderRadius: 2 },
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
              sx={{ mb: 1 }}
              InputProps={{
                sx: { borderRadius: 2 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Forgot password link */}
            <Box sx={{ textAlign: 'right', mb: 3 }}>
              <Typography
                component="a"
                href="#"
                color="primary"
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Forgot password?
              </Typography>
            </Box>

            {/* Login button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
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
              Log in
            </Button>

            {/* Social login section */}
            <Box sx={{ mb: 3 }}>
              <Typography align="center" color="textSecondary" sx={{ mb: 2 }}>
                Or
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

            {/* Register link */}
            <Typography align="center" color="textSecondary">
              Have no account yet?{' '}
              <Button
                onClick={handleRegisterClick}
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
                Register
              </Button>
            </Typography>
          </form>
        </Box>
      </FormSection>
    </LoginContainer>
  );
};

export default LoginPage; 