import React, { useEffect, useState } from 'react';
import NoteCard from '../../Components/NoteCard';
import { getNotesByQueryThunk, getAllCategoriesThunk } from '../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  Grid,
  Typography,
  makeStyles,
  CssBaseline,
  Select,
  Paper,
  Modal,
  Box
} from '@material-ui/core';
import assetBkground from '../../../src/assets/assetBkground.jpg';
import CreateNote from '../../Components/CreateNote';
import { ARCHIVEDNOTE_ROUTE } from '../../Constants';

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
    gap: '1rem',
    [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
      marginTop: '1rem',
      marginLeft: '0.5rem'
    }
  },
  container: {
    opacity: '0.75',
    height: '60%',
    marginTop: theme.spacing(10),
    [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
      marginTop: '2rem',
      width: '100%',
      height: '100%'
    }
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
      marginTop: 0,
      width: '85%',
      height: '75%'
    }
  },
  button: {
    marginTop: theme.spacing(3, 0, 2),
    marginBottom: theme.spacing(3, 0, 2)
  },
  filter: {
    backgroundColor: '#f5f5f5',
    height: '5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5rem',
    marginTop: '3rem',
    borderRadius: '5px',
    opacity: '0.75',
    color: '#000',
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
      marginTop: '0.5rem',
      marginLeft: '0.5rem'
    },
    gap: '1rem'
  }
}));

const MyNotes = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const idUserFk = window.sessionStorage.getItem('id');
  const notesByQuery = useSelector((state) => state.notesByQuery);
  const categories = useSelector((state) => state.getAllCategories);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getAllCategoriesThunk());
    dispatch(getNotesByQueryThunk(idUserFk));
  }, [dispatch, idUserFk]);
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <div className={classes.title}>
        <div className={classes.title}>
          <Typography component="h1" variant="h5">
            My Notes
          </Typography>
        </div>
        <div className={classes.title}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            className={classes.button}
          >
            Create a new note
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => (window.location.href = ARCHIVEDNOTE_ROUTE)}
            className={classes.button}
          >
            Archived Notes
          </Button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box className={classes.modal}>
            <Typography component="h1" variant="h5">
              Create note
            </Typography>
            <CreateNote />
          </Box>
        </Modal>
      </div>
      <div className={classes.filter}>
        <Typography variant="h5">Category filter</Typography>
        <Select
          native
          variant="outlined"
          color="secondary"
          value={notesByQuery.category}
          onChange={(e) => dispatch(getNotesByQueryThunk(idUserFk, e.target.value))}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>
      <Container component={Paper} elevation={5} maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {notesByQuery.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id + 'grid'}>
              <NoteCard key={note.id} note={note} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
};

export default MyNotes;
