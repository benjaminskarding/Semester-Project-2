import { login } from "../../api/auth/login";

export async function onLogin(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const userData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const result = await login(userData);

    const accessToken = result.data.accessToken;
    const name = result.data.name;

    if (!accessToken) {
      throw new Error("Access token not found in login response.");
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("username", name);

    alert("Logged in successfully! Redirecting to your dashboard...");

    window.location.href = "/";
  } catch (error) {
    console.error("Login failed:", error);
    alert(`Login failed: ${error.message}`);
  }
}
