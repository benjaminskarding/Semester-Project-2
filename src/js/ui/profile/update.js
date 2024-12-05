import { fetchUserListings } from '../../api/listing/fetch';
import { updateProfile } from '../../api/profile/profile';

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

export async function renderUserListings() {
  const username = localStorage.getItem('username');
  if (!username) {
    console.error('User is not logged in.');
    return;
  }

  try {
    const listings = await fetchUserListings(username);

    const listingsContainer = document.getElementById('listings-container');
    const userListingsContainer = document.getElementById('user-listings');

    if (!listingsContainer || !userListingsContainer) {
      console.error('Listings container or user listings container not found!');
      return;
    }

    listingsContainer.innerHTML = '';

    if (listings.length === 0) {
      listingsContainer.className = '';
      listingsContainer.innerHTML = `<p class="text-gray-500 text-center">You have no active listings.</p>`;
      return;
    }

    listings.forEach((listing) => {
      const { id, title, description, media, endsAt } = listing;
      const mediaUrl =
        media.length > 0 ? media[0].url : '/images/placeholderimage2.jfif';
      const formattedEndsAt = new Date(endsAt).toLocaleDateString();

      const listingHTML = `
        <div class="border border-gray-700 rounded p-4">
          <a href="/listing/?id=${id}" class="block">
            <img src="${mediaUrl}" alt="${title}" class="w-full h-40 object-cover rounded mb-4">
          </a>
          <h3 class="font-bold text-lg mb-2">${title}</h3>
          <p class="text-sm text-gray-400 mb-2">${
            description || 'No description provided.'
          }</p>
          <p class="text-sm text-yellow-400">Ends on: ${formattedEndsAt}</p>
        </div>
      `;

      listingsContainer.insertAdjacentHTML('beforeend', listingHTML);
    });
  } catch (error) {
    console.error('Error rendering user listings:', error);
  }
}

export async function updateProfilePicture(username, imageUrl) {
  return await updateProfile(username, { avatar: { url: imageUrl } });
}
