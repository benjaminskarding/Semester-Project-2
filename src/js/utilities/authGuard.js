export function authGuard() {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    alert('You must be logged in to view this page.');
    window.location.href = '/auth/';
    return false;
  }

  return true;
}

export function getLoggedInUserName() {
  return localStorage.getItem('name');
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function isLoggedIn() {
  const token = localStorage.getItem('accessToken');
  return token !== null;
}

export function getCurrentUser() {
  const accessToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');

  if (!accessToken || !username) {
    return null;
  }

  return {
    username,
    accessToken,
  };
}
