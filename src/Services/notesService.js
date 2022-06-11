const API_URL = process.env.REACT_APP_API_URL;

export async function createNote(payload) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getArchivedNotes(userIdFk) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/notes/archived/${userIdFk}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getNotesByQuery(userIdFk, query) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/notes/query`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      params: {
        userIdFk,
        query
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateNotes(idNote, note) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/notes/${idNote}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(note)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function deleteNote(idNote) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/notes/${idNote}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getNotesByNoteId(idNote) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/notes/${idNote}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
