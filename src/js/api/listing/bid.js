import { API_AUCTION_LISTINGS } from '../constants';
import { authHeaders } from '../../api/headers';

export async function placeBid(listingID, bidAmount) {
  try {
    const url = `${API_AUCTION_LISTINGS}/${listingID}/bids`;

    const response = await fetch(url, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ amount: bidAmount }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse.errors?.[0]?.message || 'Failed to place bid.';
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Error placing bid:', error);
    throw error;
  }
}
