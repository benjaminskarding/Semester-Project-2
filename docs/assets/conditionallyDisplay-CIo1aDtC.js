function o() {
  localStorage.removeItem('accessToken'),
    localStorage.removeItem('name'),
    (window.location.href = '/auth/');
}
function r() {
  return localStorage.getItem('accessToken')
    ? !0
    : (alert('You must be logged in to view this page.'),
      (window.location.href = '/auth/'),
      !1);
}
function n() {
  return localStorage.getItem('accessToken') !== null;
}
function a() {
  const e = localStorage.getItem('accessToken'),
    t = localStorage.getItem('username');
  return !e || !t ? null : { username: t, accessToken: e };
}
function s() {
  const e = document.getElementById('user-actions'),
    t = document.querySelector('header nav');
  if (!e || !t) {
    console.error('Element with id "user-actions" not found in the DOM.');
    return;
  }
  (e.innerHTML = ''),
    n()
      ? ((e.innerHTML = `
      <button id="logoutButton" class="font-normal">Logout</button>
      <a href="/profile/" class="flex items-center">
        <img src="/public/images/user.svg" alt="Profile" class="h-6 w-6" />
      </a>
    `),
        document.getElementById('logoutButton').addEventListener('click', o),
        (t.innerHTML = `
      <a
        href="/"
        class="hover:text-[#FFD700] font-normal border-r border-gray-500 pr-4 last:border-none"
        >Listings</a
      >
      <a
        href="/listing/create/"
        class="hover:text-[#FFD700] font-normal border-r border-gray-500 pr-4 last:border-none"
        >Create Listing</a
      >
      <a
        href="/profile/"
        class="hover:text-[#FFD700] font-normal"
        >My Listings</a
      >
    `))
      : ((e.innerHTML = `
      <a href="/auth/register/" class="hover:text-[#FFD700] font-normal">Register</a>
      <a href="/auth/login/" class="hover:text-[#FFD700] font-normal">Log In</a>
    `),
        (t.innerHTML = ''));
}
export { r as a, s as c, a as g, n as i, o };
