import { isLoggedIn, getLoggedInUserName } from "./authGuard";
import { onLogout } from "../ui/auth/logout";

export function updateHeader() {
  const userActions = document.getElementById("user-actions");

  if (!userActions) {
    console.error('Element with id "user-actions" not found in the DOM.');
    return;
  }

  if (isLoggedIn()) {
    const username = getLoggedInUserName();
    userActions.innerHTML = `
      <button id="logoutButton" class="hover:text-[#FFD700] font-medium">Logout</button>
      <a href="#" class="flex items-center">
        <img src="/public/images/search.svg" alt="search icon" class="h-6 w-6" />
      </a>
      <a href="/profile/" class="flex items-center">
        <img src="/public/images/user.svg" alt="user icon" class="h-6 w-6" />
      </a>
    `;

    document.getElementById("logoutButton").addEventListener("click", onLogout);
  } else {
    userActions.innerHTML = `
      <a href="auth/register/" class="hover:text-[#FFD700] font-medium">Register</a>
      <a href="/auth/login/" class="hover:text-[#FFD700] font-medium">Log In</a>
    `;
  }
}
