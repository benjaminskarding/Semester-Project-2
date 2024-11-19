import { registerUser } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const userData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const result = await registerUser(userData);

    alert("Registration successful! Redirecting to login page...");

    window.location.href = "/auth/login/";
  } catch (error) {
    console.error("Registration failed:", error);
    alert(`Registration failed: ${error.message}`);
  }
}
