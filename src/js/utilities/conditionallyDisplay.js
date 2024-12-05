import { isLoggedIn } from './authGuard';
import { onLogout } from '../ui/auth/logout';

export function conditionallyUpdateUI() {
  const userActions = document.getElementById('user-actions');
  const nav = document.querySelector('header nav');

  if (!userActions || !nav) {
    console.error('Element with id "user-actions" not found in the DOM.');
    return;
  }

  userActions.innerHTML = '';

  if (isLoggedIn()) {
    userActions.innerHTML = `
      <button id="logoutButton" class="font-normal">Logout</button>
      <a href="/profile/" class="flex items-center">
        <img src="/images/user.svg" alt="Profile" class="h-6 w-6" />
      </a>
    `;

    document.getElementById('logoutButton').addEventListener('click', onLogout);

    nav.innerHTML = `
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
    `;
  } else {
    userActions.innerHTML = `
      <a href="/auth/register/" class="hover:text-[#FFD700] font-normal">Register</a>
      <a href="/auth/login/" class="hover:text-[#FFD700] font-normal">Log In</a>
    `;

    nav.innerHTML = '';
  }
}
