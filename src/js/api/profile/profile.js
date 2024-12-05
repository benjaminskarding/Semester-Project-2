import { API_AUCTION_PROFILES } from '../constants';
import { authHeaders } from '../headers';

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
