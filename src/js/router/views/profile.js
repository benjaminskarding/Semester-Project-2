import { updateHeader } from "../../utilities/conditionallyDisplay";
import { readProfile } from "../../api/profile/read";
import { displayUserProfile } from "../../ui/profile/update";

export default async function profileView() {
  const username = localStorage.getItem("username") || "testUser";

  if (!username) {
    console.error("No username found in localStorage.");
    return;
  }

  const userData = await readProfile(username);

  if (userData) {
    displayUserProfile(userData);
  } else {
    console.error("Failed to load user profile.");
  }
}

profileView();
updateHeader();
