import { API_SOCIAL_PROFILES } from "../constants";
import { authHeaders } from "../headers";

export async function readProfile(username) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
      method: "GET",
      headers: authHeaders(),
    });

    if (!response.ok) {
      console.error("API error:", response.status, response.statusText);
      throw new Error(`Error fetching profile: ${response.statusText}`);
    }

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error("Error in readProfile:", error.message);
    return null;
  }
}
