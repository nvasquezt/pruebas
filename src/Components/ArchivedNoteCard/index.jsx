import React, { useState } from 'react';
import { Avatar, Button, Container, Typography, makeStyles, Modal, Box } from '@material-ui/core';
import { Restore, Edit, Delete } from '@material-ui/icons';
import { updateNotes, deleteNote } from '../../Services/notesService';
import { PropTypes } from 'prop-types';
import EditNote from '../EditNote';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3]
  },
  avatar: {
    width: theme.spacing(10)
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  icons: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(2),
    gap: theme.spacing(1)
  },
  hover: {
    cursor: 'pointer'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
    marginTop: theme.spacing(5)
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
  }
}));

const ArchivedNoteCard = ({ note }) => {
  const [open, setOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const classes = useStyles();
  const lastUpdated = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const idNote = note.idNote;
  const handleToActive = async () => {
    const data = {
      status: true
    };
    await updateNotes(idNote, data);
    window.location.reload();
  };
  const handlerDeleteNote = async () => {
    await deleteNote(idNote);
    window.location.reload();
  };
  return (
    <Container maxWidth="xs" className={classes.root}>
      <Container className={classes.avatar}>
        <Avatar>{note.title.charAt(0)}</Avatar>
      </Container>
      <Container className={classes.info}>
        <Typography variant="h5">{note.title}</Typography>
        <Typography variant="body1">Last edited: {lastUpdated(note.updatedAt)}</Typography>
        <Container className={classes.icons}>
          <Restore
            onClick={handleToActive}
            color="primary"
            fontSize="small"
            className={classes.hover}
          />
          <Edit
            color="primary"
            fontSize="small"
            className={classes.hover}
            onClick={() => setOpen(true)}
          />
          <Modal open={open} onClose={() => setOpen(false)}>
            <Box className={classes.modal}>
              <Typography component="h1" variant="h5">
                Edit note
              </Typography>
              <EditNote idNote={idNote} />
            </Box>
          </Modal>
          <Delete
            color="primary"
            fontSize="small"
            className={classes.hover}
            onClick={() => setModalDelete(true)}
          />
          <Modal open={modalDelete} onClose={() => setModalDelete(false)}>
            <Box className={classes.modal}>
              <Typography component="h1" variant="h5">
                Are you sure you want to delete this note?
              </Typography>
              <Container className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setModalDelete(false)}
                  className={classes.hover}
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    handlerDeleteNote();
                    setModalDelete(false);
                  }}
                  className={classes.hover}
                >
                  Yes
                </Button>
              </Container>
            </Box>
          </Modal>
        </Container>
      </Container>
    </Container>
  );
};

ArchivedNoteCard.propTypes = {
  note: PropTypes.object.isRequired
};

export default ArchivedNoteCard;
