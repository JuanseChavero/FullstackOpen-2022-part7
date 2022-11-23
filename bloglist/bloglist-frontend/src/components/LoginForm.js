import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { userLogin } from '../library/reducers/loggedUserReducer';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username] = useField('text');
  const [password] = useField('password');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ username: username.value, password: password.value }));

    // Even if the credentials were invalid or there was an error, the user will still
    // be redirected to home. I don't know how to handle this without React-query or RTK query.
    navigate('/');
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" paddingY={3}>
        Log in to application
      </Typography>
      <form onSubmit={handleOnSubmit} id="login">
        {/* Username Input */}
        <TextField
          fullWidth
          id="username-input"
          label="Username"
          variant="outlined"
          name="username"
          {...username}
        />

        <Box mt={2} />

        {/* Password input */}
        <TextField
          fullWidth
          id="password-input"
          label="Password"
          variant="outlined"
          name="password"
          type={showPassword ? 'text' : password.type}
          {...password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  color="primary"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box mt={2} />

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            id="submit-login"
            type="submit"
            variant="contained"
            color="primary"
          >
            login
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default LoginForm;
