import React, { useEffect } from 'react';
import ArchivedNoteCard from '../../Components/ArchivedNoteCard';
import { getArchivedNotesThunk } from '../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  Grid,
  Typography,
  makeStyles,
  CssBaseline,
  Paper
} from '@material-ui/core';
import assetBkground from '../../../src/assets/assetBkground.jpg';
import { MYNOTES_ROUTE } from '../../Constants';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${assetBkground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '3rem',
    gap: '1rem'
  },
  container: {
    opacity: '0.75',
    height: '60%',
    marginTop: theme.spacing(10)
  },
  button: {
    marginTop: theme.spacing(3, 0, 2),
    marginBottom: theme.spacing(3, 0, 2)
  }
}));

const ArchivedNotes = () => {
  const dispatch = useDispatch();
  const idUserFk = window.sessionStorage.getItem('id');
  const archivedNotes = useSelector((state) => state.archivedNotes);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getArchivedNotesThunk(idUserFk));
  }, [dispatch, idUserFk]);
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <div className={classes.title}>
        <div className={classes.title}>
          <Typography component="h1" variant="h5">
            Archived Notes
          </Typography>
        </div>
        <div className={classes.title}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => (window.location.href = MYNOTES_ROUTE)}
            className={classes.button}
          >
            Active Notes
          </Button>
        </div>
      </div>
      <Container component={Paper} elevation={5} maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {archivedNotes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id + 'grid'}>
              <ArchivedNoteCard key={note.id} note={note} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
};

export default ArchivedNotes;
