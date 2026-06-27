import {
  Alert,
  Box,
  Button,
  Collapse,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { IconArrowRight, IconEye, IconEyeOff, IconLock, IconUser } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthActions } from 'src/apiActions/useAuthActions';
import riceMealLogo from 'src/assets/login-bg/riceMealLogo-background-removed.png';
import CustomCheckbox from 'src/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import useLoginForm from 'src/forms/auth/useLoginForm';
import { ILoginRequest } from 'src/interface/auth.types';
import { loginType } from 'src/types/auth/auth';

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [isHide, setIsHide] = useState(true);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuthActions();

  const handleLogin = async (values: ILoginRequest) => {
    try {
      const data: any = await login(values.username, values.password);
      if (data?.data.access_token) {
        navigate('/dashboard');
      }
    } catch (error) {
      const msg = (error as any)?.error?.message || 'Incorrect username or password';
      setErrorMessage(msg);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } =
    useLoginForm(handleLogin);
  return (
    <>
      {/* --------------NEW----------------- */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: 2,
          py: 2,
          background: '#fff',
        }}
      >
        {/* 🔹 LOGO — circular ring around logo */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',

              border: '2px solid #4CAF50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1,
              background: '#fff',
            }}
          >
            <img
              src={riceMealLogo}
              alt="logo"
              style={{
                height: '100px',
                width: '100px',
                padding: '10px',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Box>

        {/* 🔹 TITLE */}
        {title && (
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontSize: '22px',
              textAlign: 'center',
              color: '#1B5E20',
              mb: 0.5,
            }}
          >
            {title}
          </Typography>
        )}

        {/* 🔹 SUBTEXT */}
        {subtext && (
          <Box textAlign="center" mb={2.5}>
            {subtext}
          </Box>
        )}

        <Collapse in={Boolean(errorMessage)}>
          <Box sx={{ mb: 2 }}>
            <Alert
              severity="error"
              onClose={() => setErrorMessage(null)}
              sx={{
                fontSize: '13px',
                borderRadius: '8px',
                backgroundColor: '#FFEBEE', // Light red background
                color: '#D32F2F',
                '& .MuiAlert-icon': { fontSize: '20px' },
              }}
            >
              {errorMessage}
            </Alert>
          </Box>
        </Collapse>

        <Stack spacing={1.8}>
          {/* Username */}
          <CustomTextField
            id="username"
            fullWidth
            size="small"
            value={values.username}
            onChange={handleChange('username')}
            onBlur={handleBlur('username')}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            placeholder="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconUser size={18} stroke={1.5} color="#aaa" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                paddingTop: '4px',
                paddingBottom: '4px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ddd',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4CAF50',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2E7D32',
              },
            }}
          />

          {/* Password */}
          <CustomTextField
            id="password"
            type={isHide ? 'password' : 'text'}
            fullWidth
            size="small"
            value={values.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            placeholder="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconLock size={18} stroke={1.5} color="#aaa" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsHide(!isHide)} edge="end" size="small">
                    {isHide ? (
                      <IconEyeOff size={18} color="#aaa" />
                    ) : (
                      <IconEye size={18} color="#aaa" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                paddingTop: '4px',
                paddingBottom: '4px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ddd',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4CAF50',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2E7D32',
              },
            }}
          />

          {/* Remember + Forgot */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={
                <CustomCheckbox
                  defaultChecked
                  sx={{
                    p: 0.5,
                    color: '#2E7D32',
                    '&.Mui-checked': { color: '#2E7D32' },
                  }}
                />
              }
              label="Remember me"
              sx={{
                m: 0,
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.83rem',
                  color: '#444',
                },
              }}
            />
            <Typography
              sx={{
                fontSize: '0.83rem',
                color: '#2E7D32',
                cursor: 'pointer',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Forgot Password?
            </Typography>
          </Box>

          {/* Login Button — green gradient with arrow */}
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={isSubmitting}
            endIcon={<IconArrowRight size={18} />}
            sx={{
              mt: 0.5,
              py: 1.3,
              borderRadius: '5px',
              fontWeight: 600,
              fontSize: '15px',
              background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
              textTransform: 'none',
              letterSpacing: 0.5,
              boxShadow: '0 4px 15px rgba(46,125,50,0.35)',
              '&:hover': {
                background: 'linear-gradient(135deg, #388E3C 0%, #2E7D32 100%)',
                boxShadow: '0 6px 20px rgba(46,125,50,0.45)',
              },
              '&:disabled': {
                background: '#ccc',
              },
            }}
          >
            Login
          </Button>
        </Stack>

        {/* FOOTER */}
        {subtitle && (
          <Box mt={2} textAlign="center">
            {subtitle}
          </Box>
        )}
      </Box>
    </>
  );
};
export default AuthLogin;
