import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Paper,
  makeStyles,
  TextField,
  Button,
  CssBaseline,
  Chip,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotes } from '../../Services/notesService';
import { createCategory, deleteCategory } from '../../Services/categoryService';
import { getNotesByNoteIdThunk, getCategoriesThunk } from '../../Store/actions';
import { PropTypes } from 'prop-types';

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
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing(1)
  },
  containerActivate: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(1)
  }
}));

const EditNote = ({ idNote }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const noteById = useSelector((state) => state.noteById);
  const categories = useSelector((state) => state.categories);
  const [payload, setPayload] = useState({
    title: '',
    content: ''
  });
  const [tags, setTags] = useState({});
  const onChangeNote = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };
  const onChangeTags = (e) => {
    setTags({ ...tags, [e.target.name]: e.target.value });
  };
  const handlerCreateCategory = async () => {
    const dataCategory = {
      idNoteFk: idNote,
      name: tags.name
    };
    await createCategory(dataCategory);
  };
  const onSubmitNote = async (e) => {
    e.preventDefault();
    await updateNotes(idNote, payload);
    window.location.reload();
  };
  useEffect(() => {
    dispatch(getNotesByNoteIdThunk(idNote));
    dispatch(getCategoriesThunk(idNote));
  }, [dispatch, idNote]);

  const { title } = noteById;
  console.log(categories);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Container component={Paper} elevation={8} maxWidth="sm" className={classes.container}>
        <div className={classes.div}>
          <Typography component="h1" variant="h5">
            Edit Note: {title}
          </Typography>
          <form className={classes.form} onSubmit={onSubmitNote}>
            <Container component="div" maxWidth="sm" className={classes.containerActivate}>
              <Typography variant="body1">New title</Typography>
              <TextField
                required
                name="title"
                variant="filled"
                type="text"
                onChange={onChangeNote}
              />
            </Container>
            <Container component="div" maxWidth="sm" className={classes.containerActivate}>
              <Typography variant="body1">New Content</Typography>
              <TextField
                multiline
                required
                minRows={4}
                name="content"
                variant="filled"
                onChange={onChangeNote}
              />
            </Container>
            <Container className={classes.tags}>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Chip
                    key={category.idCategory}
                    label={category.name}
                    color="primary"
                    variant="filled"
                    onDelete={() => dispatch(deleteCategory(category.idCategory))}
                  />
                ))
              ) : (
                <Chip label="No tags" />
              )}
              <TextField
                fullWidth
                label="Add a tag"
                name="name"
                variant="outlined"
                type="text"
                autoFocus
                onChange={onChangeTags}
              />
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handlerCreateCategory}
              >
                Add Tag
              </Button>
            </Container>
            <Container className={classes.buttonContainer}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Edit Note
              </Button>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => window.location.reload()}
              >
                Cancel
              </Button>
            </Container>
          </form>
        </div>
      </Container>
    </Grid>
  );
};

EditNote.propTypes = {
  idNote: PropTypes.string.isRequired
};

export default EditNote;
