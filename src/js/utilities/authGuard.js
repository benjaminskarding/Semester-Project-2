export function authGuard() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    alert("You must be logged in to view this page.");
    window.location.href = "/auth/";
    return false;
  }

  return true;
}

export function getLoggedInUserName() {
  return localStorage.getItem("name");
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function isLoggedIn() {
  const token = localStorage.getItem("accessToken");
  return token !== null;
}
