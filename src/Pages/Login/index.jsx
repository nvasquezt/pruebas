import React, { useState } from 'react';
import { login } from '../../Services/loginService';
import {
  Grid,
  Container,
  Paper,
  makeStyles,
  Avatar,
  Typography,
  TextField,
  Button,
  CssBaseline,
  Snackbar
} from '@material-ui/core';
import assetBkground from '../../../src/assets/assetBkground.jpg';
import { BookTwoTone } from '@material-ui/icons';
import { REGISTER_ROUTE, MYNOTES_ROUTE } from '../../Constants';

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
    height: '60%',
    marginTop: theme.spacing(10),
    [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
      marginTop: 0,
      width: '100%',
      height: '100%'
    }
  },
  div: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(3, 0, 2)
  }
}));

const Login = () => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({ email: '', password: '' });
  const classes = useStyles();

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginUser = async () => {
      const response = await login(payload);
      if (response.token) {
        const { token, id } = response;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('id', id);
        window.location.href = MYNOTES_ROUTE;
      } else {
        setOpen(true);
      }
    };
    loginUser();
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Container component={Paper} elevation={5} maxWidth="xs" className={classes.container}>
        <div className={classes.div}>
          <Avatar className={classes.avatar}>
            <BookTwoTone />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              autoFocus
              required
              color="primary"
              margin="normal"
              variant="outlined"
              label="Email"
              name="email"
              type="email"
              value={payload.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              required
              color="primary"
              margin="normal"
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
              type="submit"
              className={classes.button}
            >
              Login
            </Button>
          </form>
          <Typography variant="body2">
            Don&apos;t have an account? <a href={REGISTER_ROUTE}>Sign Up</a>
          </Typography>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message="Invalid email or password"
        />
      </Container>
    </Grid>
  );
};

export default Login;
