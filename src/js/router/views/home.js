import { setLogoutListener } from '../../ui/global/logout';
import { conditionallyUpdateUI } from '../../utilities/conditionallyDisplay';
import { fetchListings } from '../../api/listing/fetch';
import { renderListings } from '../../ui/listing/render';
import { setupPagination } from '../../ui/pagination';
import { displayCredits } from '../../utilities/displayCredits';
import { setupSearch } from '../../ui/listing/search';

displayCredits();
conditionallyUpdateUI();
setLogoutListener();
setupSearch();

let currentPage = 1;

async function loadListings(page = 1) {
  const limit = 20;

  try {
    const { listings, totalCount } = await fetchListings(limit, page);

    if (listings && Array.isArray(listings)) {
      renderListings(listings);
      setupPagination(page, totalCount, limit, loadListings);
    } else {
      console.error('No listings data available');
    }
  } catch (error) {
    console.error('Error loading listings:', error);
  }
}

loadListings(currentPage);
