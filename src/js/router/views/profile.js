import { conditionallyUpdateUI } from '../../utilities/conditionallyDisplay';
import { fetchProfile, renderUserListings } from '../../api/profile/profile';
import {
  renderProfile,
  setupProfilePictureUpdate,
} from '../../ui/profile/update';
import { displayCredits } from '../../utilities/displayCredits';

export default async function profileView() {
  const username = localStorage.getItem('username');

  if (!username) {
    console.error('No username found in localStorage.');
    return;
  }

  try {
    const profileData = await fetchProfile(username);
    if (profileData) {
      renderProfile(profileData);
    } else {
      console.error('Failed to load profile data.');
    }

    displayCredits('totalCredits');

    setupProfilePictureUpdate(username);
  } catch (error) {
    console.error('Error in profileView:', error);
  }
}

conditionallyUpdateUI();
profileView();
renderUserListings();
