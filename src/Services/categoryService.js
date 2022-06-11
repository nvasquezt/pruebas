const API_URL = process.env.REACT_APP_API_URL;

export async function createCategory(payload) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/categories`, {
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

export async function getCategoriesByNote(idNoteFk) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/categories/${idNoteFk}`, {
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

export async function deleteCategory(idCategory) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/categories/${idCategory}`, {
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

export async function getAllCategories() {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/categories`, {
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
