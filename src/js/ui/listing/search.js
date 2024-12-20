import { isLoggedIn } from '../../utilities/authGuard';
import { fetchFilteredListings, fetchListings } from '../../api/listing/fetch';
import { renderListings } from './render';

export function setupSearch() {
  const creditsSection = document.getElementById('credits-section');
  const searchField = document.querySelector('.search-field');
  const aside = document.querySelector('aside');

  if (isLoggedIn()) {
    creditsSection.style.display = 'block';
    creditsSection.parentNode.insertBefore(
      searchField,
      creditsSection.nextSibling
    );
  } else {
    creditsSection.style.display = 'none';

    aside.insertBefore(searchField, aside.firstChild);
    searchField.classList.remove('mt-6');
    searchField.classList.add('mt-0');
  }

  const searchInput = searchField.querySelector('input');
  if (!searchInput) {
    console.error('Search input not found inside searchField.');
    return;
  }

  searchInput.addEventListener('input', async (event) => {
    const query = event.target.value.trim();

    if (query === '') {
      const { listings } = await fetchListings();
      renderListings(listings);
    } else {
      const filteredListings = await fetchFilteredListings(query);
      renderListings(filteredListings);
    }
  });
}
