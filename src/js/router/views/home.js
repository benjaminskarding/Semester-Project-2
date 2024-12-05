import { setLogoutListener } from '../../ui/global/logout';
import { conditionallyUpdateUI } from '../../utilities/conditionallyDisplay';
import { fetchListings } from '../../api/listing/fetch';
import { renderListings } from '../../ui/listing/render';
import { setupPagination } from '../../ui/pagination';
import { displayCredits } from '../../utilities/displayCredits';
import { setupSearch } from '../../ui/listing/search';
import { sortListings } from '../../utilities/sorting';

displayCredits();
conditionallyUpdateUI();
setLogoutListener();
setupSearch();

let currentPage = 1;

const sortBySelect = document.getElementById('sort-by');

if (sortBySelect) {
  const initialSort = sortBySelect.value;

  loadListings(currentPage, initialSort);

  sortBySelect.addEventListener('change', () => {
    const selectedSort = sortBySelect.value;

    loadListings(currentPage, selectedSort);
  });
} else {
  console.error('Sort control not found');
}

async function loadListings(page = 1, sortBy = 'created_desc') {
  const limit = 20;

  try {
    let { listings, totalCount } = await fetchListings(limit, page);

    if (listings && Array.isArray(listings)) {
      listings = sortListings(listings, sortBy);
      renderListings(listings);

      setupPagination(page, totalCount, limit, (newPage) => {
        loadListings(newPage, sortBy);
      });
    } else {
      console.error('No listings data available');
    }
  } catch (error) {
    console.error('Error loading listings:', error);
  }
}

loadListings(currentPage);
