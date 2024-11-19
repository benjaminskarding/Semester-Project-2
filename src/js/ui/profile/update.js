export function displayUserProfile(userData) {
  if (!userData) {
    console.error("No user data provided to displayUserProfile.");
    return;
  }

  const usernameElement = document.getElementById("username");
  if (usernameElement) {
    usernameElement.textContent = userData.name || "Unknown User";
  } else {
    console.error("#username element not found.");
  }

  const profilePictureElement = document.getElementById("profilePicture");
  if (profilePictureElement) {
    profilePictureElement.src = userData.avatar?.url || "/default-avatar.jpg";
    profilePictureElement.alt = userData.avatar?.alt || "Profile Picture";
  } else {
    console.error("#profilePicture element not found.");
  }
}
