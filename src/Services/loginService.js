const API_URL = process.env.REACT_APP_API_URL;

export async function login(payload) {
  try {
    const response = await fetch(`${API_URL}/auth/local/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
