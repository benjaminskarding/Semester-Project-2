import { API_AUCTION_LISTINGS, API_AUCTION_PROFILES } from '../constants';
import { publicHeaders, authHeaders } from '../headers';

export async function fetchListings(limit = 12, page = 1) {
  try {
    const url = `${API_AUCTION_LISTINGS}?_bids=true&limit=${limit}&page=${page}&nocache=${new Date().getTime()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: publicHeaders(),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Failed to fetch listings: ${response.status} ${response.statusText}, body: ${errorBody}`
      );
      throw new Error(
        `Failed to fetch listings: ${response.statusText || response.status}`
      );
    }

    const data = await response.json();

    const sortedListings = data.data.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

    return {
      listings: sortedListings,
      totalCount: data.meta.totalCount,
    };
  } catch (error) {
    console.error('Error fetching listings:', error.message);
    return null;
  }
}

export async function fetchListingById(id) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${id}?_bids=true`);
    if (!response.ok) {
      throw new Error(`Failed to fetch listing: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
}

export async function fetchUserListings(username) {
  const url = `${API_AUCTION_PROFILES}/${username}?_listings=true`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: authHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user listings: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.listings || [];
  } catch (error) {
    console.error('Error fetching user listings:', error);
    return [];
  }
}

export async function fetchFilteredListings(query) {
  try {
    const url = `${API_AUCTION_LISTINGS}/search?q=${encodeURIComponent(query)}&_bids=true`;
    const response = await fetch(url, {
      method: 'GET',
      headers: publicHeaders(),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch filtered listings: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching filtered listings:', error);
    return [];
  }
}
