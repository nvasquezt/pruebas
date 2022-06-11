import React, { useState } from 'react';
import { createUser } from '../../Services/usersService';
import {
  Grid,
  Container,
  Paper,
  makeStyles,
  Typography,
  TextField,
  Button,
  CssBaseline
} from '@material-ui/core';
import assetBkground from '../../../src/assets/assetBkground.jpg';
import { LOGIN_ROUTE } from '../../Constants';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${assetBkground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  },
  container: {
    opacity: '0.75',
    height: '80%',
    marginTop: theme.spacing(10),
    [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
      marginTop: 0,
      width: '100%',
      height: '100%'
    }
  },
  div: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5)
  },
  button: {
    marginTop: theme.spacing(3, 0, 2)
  }
}));

const Register = () => {
  const [payload, setPayload] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const register = await createUser(payload);
    register ? (window.location.href = LOGIN_ROUTE) : console.log('error');
  };
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Container component={Paper} elevation={8} maxWidth="sm" className={classes.container}>
        <div className={classes.div}>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              variant="outlined"
              label="First Name"
              name="firstName"
              type="text"
              autoFocus
              value={payload.firstName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              label="Last Name"
              name="lastName"
              type="text"
              autoFocus
              value={payload.lastName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              label="Email"
              name="email"
              type="email"
              autoFocus
              value={payload.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              required
              color="primary"
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              value={payload.password}
              onChange={handleChange}
            />
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              className={classes.button}
              type="submit"
            >
              Register
            </Button>
          </form>
          <Typography variant="body2">
            Already have an account? <a href={LOGIN_ROUTE}>Login</a>
          </Typography>
        </div>
      </Container>
    </Grid>
  );
};

export default Register;
