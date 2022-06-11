const API_URL = process.env.REACT_APP_API_URL;

export async function createUser(payload) {
  try {
    const dataUser = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await dataUser.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getUserById(uid) {
  try {
    const token = sessionStorage.getItem('token');
    const dataUser = await fetch(`${API_URL}/api/users/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await dataUser.json();
    return data;
  } catch (error) {
    return error;
  }
}
