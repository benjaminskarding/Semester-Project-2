import { updateProfilePicture } from '../../api/profile/profile';

export function renderProfile(userData) {
  if (!userData) {
    console.error('No data to render profile.');
    return;
  }

  const usernameElement = document.getElementById('username');
  const profilePictureElement = document.getElementById('profilePicture');

  if (usernameElement) {
    usernameElement.textContent = userData.name || 'Unknown User';
  } else {
    console.error('#username element not found.');
  }

  if (profilePictureElement) {
    profilePictureElement.src = userData.avatar?.url || '';
    profilePictureElement.alt = userData.avatar?.alt || 'Profile Picture';
  } else {
    console.error('#profilePicture element not found.');
  }
}

export function setupProfilePictureUpdate(username) {
  const updateButton = document.getElementById('updateButton');
  const imageUrlInput = document.getElementById('imageUrlInput');

  if (!updateButton || !imageUrlInput) {
    console.error('Update button or image URL input not found.');
    return;
  }

  updateButton.addEventListener('click', async () => {
    const newImageUrl = imageUrlInput.value.trim();
    if (!newImageUrl) {
      alert('Please enter a valid image URL.');
      return;
    }

    try {
      const updatedProfile = await updateProfilePicture(username, newImageUrl);
      if (updatedProfile) {
        alert('Profile picture updated successfully!');

        const profilePictureElement = document.getElementById('profilePicture');
        if (profilePictureElement) {
          profilePictureElement.src = newImageUrl;
        }
      } else {
        alert('Failed to update profile picture.');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      alert('Failed to update profile picture. Please try again.');
    }
  });
}
