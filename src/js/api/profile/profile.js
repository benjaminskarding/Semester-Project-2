import { API_AUCTION_PROFILES } from '../constants';
import { authHeaders } from '../headers';
import { fetchUserListings } from '../listing/fetch';

export async function fetchProfile(username) {
  try {
    const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
      method: 'GET',
      headers: authHeaders(),
    });

    if (!response.ok) {
      console.error('API error:', response.status, response.statusText);
      throw new Error(`Error fetching profile: ${response.statusText}`);
    }

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error('Error in readProfile:', error.message);
    return null;
  }
}

export async function updateProfile(username, updates) {
  try {
    const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating profile:', error);
    return null;
  }
}

export async function updateProfilePicture(username, imageUrl) {
  return await updateProfile(username, { avatar: { url: imageUrl } });
}

export async function displayCredits(elementId = 'availableCredits') {
  const username = localStorage.getItem('username');

  if (!username) {
    console.error('No username found in localStorage.');
    return;
  }

  try {
    const profileData = await fetchProfile(username);
    if (profileData) {
      const creditsElement = document.getElementById(elementId);
      if (creditsElement) {
        creditsElement.textContent = `${profileData.credits || 0}`;
      }
    } else {
      console.error('Failed to fetch profile data.');
    }
  } catch (error) {
    console.error('Error fetching credits:', error);
  }
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
      const { title, description, media, endsAt } = listing;
      const mediaUrl =
        media.length > 0
          ? media[0].url
          : '/public/images/placeholderimage2.jfif';
      const formattedEndsAt = new Date(endsAt).toLocaleDateString();

      const listingHTML = `
        <div class="border border-gray-700 rounded p-4">
          <img src="${mediaUrl}" alt="${title}" class="w-full h-40 object-cover rounded mb-4">
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
