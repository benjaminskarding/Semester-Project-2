import { API_AUTH_LOGIN } from '../constants';
import { publicHeaders } from '../headers';

export async function login({ email, password }) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: 'POST',
      headers: publicHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    const accessToken = data.data?.accessToken;
    const name = data.data?.name;

    if (!accessToken || !name) {
      console.error('Invalid API response structure:', data);
      throw new Error('Invalid API response: missing accessToken or name.');
    }

    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}
