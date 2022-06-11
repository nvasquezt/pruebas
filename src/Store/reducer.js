const initialState = {
  categories: [],
  getAllCategories: [],
  archivedNotes: [],
  notesByQuery: [],
  userById: {},
  noteById: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CATEGORY':
      return { ...state, categories: action.payload };
    case 'GET_ARCHIVED_NOTES':
      return { ...state, archivedNotes: action.payload };
    case 'GET_NOTES_BY_QUERY':
      return { ...state, notesByQuery: action.payload };
    case 'GET_USER_BY_ID':
      return { ...state, userById: action.payload };
    case 'GET_NOTES_BY_NOTE_ID':
      return { ...state, noteById: action.payload };
    case 'GET_ALL_CATEGORIES':
      return { ...state, getAllCategories: action.payload };
    default:
      return state;
  }
}
