import { authHeaders } from '../headers';
import { API_AUCTION_LISTINGS } from '../constants';

export async function createListing(data) {
  try {
    const response = await fetch(API_AUCTION_LISTINGS, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error creating listing: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in createListing:', error);
    throw error;
  }
}
