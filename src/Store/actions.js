import { getCategoriesByNote, getAllCategories } from '../Services/categoryService';
import { getArchivedNotes, getNotesByQuery, getNotesByNoteId } from '../Services/notesService';
import { getUserById } from '../Services/usersService';

export const getCategoriesAction = (categories) => ({ type: 'GET_CATEGORY', payload: categories });
export const getAllCategoriesAction = (categories) => ({
  type: 'GET_ALL_CATEGORIES',
  payload: categories
});
export const getArchivedNotesAction = (notes) => ({ type: 'GET_ARCHIVED_NOTES', payload: notes });
export const getNotesByQueryAction = (notes) => ({ type: 'GET_NOTES_BY_QUERY', payload: notes });
export const getUserByIdAction = (user) => ({ type: 'GET_USER_BY_ID', payload: user });
export const getNotesByNoteIdAction = (note) => ({ type: 'GET_NOTES_BY_NOTE_ID', payload: note });

export const getCategoriesThunk = (idNoteFk) => async (dispatch) => {
  try {
    const categories = await getCategoriesByNote(idNoteFk);
    dispatch(getCategoriesAction(categories));
  } catch (error) {
    return error;
  }
};

export const getArchivedNotesThunk = (userIdFk) => async (dispatch) => {
  try {
    const notes = await getArchivedNotes(userIdFk);
    dispatch(getArchivedNotesAction(notes));
  } catch (error) {
    return error;
  }
};

export const getNotesByQueryThunk = (userIdFk, query) => async (dispatch) => {
  try {
    const notes = await getNotesByQuery(userIdFk, query);
    dispatch(getNotesByQueryAction(notes));
  } catch (error) {
    return error;
  }
};

export const getUserByIdThunk = (idUserFk) => async (dispatch) => {
  try {
    const user = await getUserById(idUserFk);
    dispatch(getUserByIdAction(user));
  } catch (error) {
    return error;
  }
};

export const getNotesByNoteIdThunk = (idNote) => async (dispatch) => {
  try {
    const note = await getNotesByNoteId(idNote);
    dispatch(getNotesByNoteIdAction(note));
  } catch (error) {
    return error;
  }
};

export const getAllCategoriesThunk = () => async (dispatch) => {
  try {
    const categories = await getAllCategories();
    dispatch(getAllCategoriesAction(categories));
  } catch (error) {
    return error;
  }
};
