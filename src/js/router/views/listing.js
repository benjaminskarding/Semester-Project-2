import { conditionallyUpdateUI } from '../../utilities/conditionallyDisplay';
import { renderSingleListingPage } from '../../ui/listing/render';
import { displayCredits } from '../../utilities/displayCredits';
import { setupBidButton } from '../../ui/listing/bid';
import { isLoggedIn } from '../../utilities/authGuard';
import { getListingIdFromPage } from '../../utilities/getListingIdFromPage';

function initializeListingPage() {
  displayCredits();
  conditionallyUpdateUI();
  renderSingleListingPage();
  conditionallyUpdateListingUI();

  const listingId = getListingIdFromPage();
  const currentBid = getCurrentBidFromPage();
  setupBidButton(listingId, currentBid);
}

function conditionallyUpdateListingUI() {
  const bidButton = document.getElementById('bidButton');
  const creditsSection = document.getElementById('creditsBlock');

  if (!isLoggedIn()) {
    bidButton?.style.setProperty('display', 'none');
    creditsSection?.style.setProperty('display', 'none');
  }
}

function getCurrentBidFromPage() {
  const currentBidElement = document.getElementById('currentBid');
  return parseFloat(currentBidElement?.textContent?.trim()) || 0;
}

initializeListingPage();
