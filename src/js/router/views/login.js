import { onLogin } from "../../ui/auth/login";

const form = document.forms.login;

if (form) {
  form.addEventListener("submit", onLogin);
} else {
  console.error("Form not found! Ensure the form exists.");
}
