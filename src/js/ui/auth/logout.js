export function onLogout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('name');

  window.location.href = '/auth/';
}
