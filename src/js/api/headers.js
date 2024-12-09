import { API_KEY } from './constants';

export function publicHeaders() {
  return new Headers({
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY,
  });
}

export function authHeaders() {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY,
  });

  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  } else {
    console.warn('Access token is missing in localStorage!');
  }

  return headers;
}
