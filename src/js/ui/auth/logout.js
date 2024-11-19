export function onLogout() {
  console.log("Logging out...");

  localStorage.removeItem("accessToken");
  localStorage.removeItem("name");

  window.location.href = "/auth/";
}
