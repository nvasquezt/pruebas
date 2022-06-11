import React, { useState } from 'react';
import {
  Grid,
  Container,
  Paper,
  makeStyles,
  TextField,
  Button,
  CssBaseline
} from '@material-ui/core';
import { createNote } from '../../Services/notesService';

const useStyles = makeStyles((theme) => ({
  container: {
    opacity: '0.75',
    height: '100%',
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down(400 + theme.spacing(1) + 1)]: {
      marginTop: 0,
      width: '100%',
      height: '100%'
    }
  },
  div: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5)
  },
  button: {
    marginTop: theme.spacing(3, 0, 2),
    marginBottom: theme.spacing(3, 0, 2)
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: theme.spacing(1)
  }
}));

const CreateNote = () => {
  const classes = useStyles();
  const userIdFk = sessionStorage.getItem('id');
  const [payload, setPayload] = useState({
    title: '',
    userIdFk,
    content: '',
    status: true
  });
  const onChangeNote = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };
  const onSubmitNote = async (e) => {
    e.preventDefault();
    await createNote(payload);
    window.location.reload();
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Container component={Paper} elevation={8} maxWidth="sm" className={classes.container}>
        <div className={classes.div}>
          <form className={classes.form} onSubmit={onSubmitNote}>
            <TextField
              fullWidth
              required
              label="title"
              name="title"
              variant="outlined"
              type="text"
              autoFocus
              onChange={onChangeNote}
            />
            <TextField
              multiline
              fullWidth
              required
              minLength={100}
              minRows={5}
              label="content"
              name="content"
              variant="outlined"
              autoFocus
              onChange={onChangeNote}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Create Note
            </Button>
          </form>
        </div>
      </Container>
    </Grid>
  );
};

export default CreateNote;
