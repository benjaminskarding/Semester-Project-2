import { fetchProfile } from '../api/profile/profile';
import { isLoggedIn } from './authGuard';

export async function displayCredits() {
  const username = localStorage.getItem('username');

  if (!username || !isLoggedIn()) {
    const creditsSection = document.querySelector('.credits-section');
    if (creditsSection) {
      creditsSection.classList.add('hidden');
    }
    return;
  }

  try {
    const profileData = await fetchProfile(username);

    if (profileData) {
      const availableCredits = profileData.credits || 0;

      const availableCreditsElement =
        document.getElementById('availableCredits');
      if (availableCreditsElement) {
        availableCreditsElement.textContent = availableCredits;
      } else {
        console.error('Available Credits Element not found!');
      }
    } else {
      console.error('Failed to fetch profile data.');
    }
  } catch (error) {
    console.error('Error fetching credits:', error);
  }
}
