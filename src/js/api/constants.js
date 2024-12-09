export const API_KEY = import.meta.env.VITE_API_KEY;

export const API_BASE = import.meta.env.VITE_NOROFF_API_BASE_URL;

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_AUCTION = `${API_BASE}/auction`;

export const API_AUCTION_PROFILES = `${API_AUCTION}/profiles`;

export const API_AUCTION_LISTINGS = `${API_AUCTION}/listings`;
