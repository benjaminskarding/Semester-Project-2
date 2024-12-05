import { conditionallyUpdateUI } from '../../utilities/conditionallyDisplay';
import { renderSingleListingPage } from '../../ui/listing/render';
import { displayCredits } from '../../utilities/displayCredits';
import { setupBidButton } from '../../ui/listing/bid';
import { isLoggedIn } from '../../utilities/authGuard';

displayCredits();
conditionallyUpdateUI();
renderSingleListingPage();
conditionallyUpdateListingPageUI();

function getListingIdFromPage() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

function conditionallyUpdateListingPageUI() {
  const bidButton = document.getElementById('bidButton');
  const creditsSection = document.getElementById('creditsBlock');

  if (!isLoggedIn()) {
    if (bidButton) {
      bidButton.style.display = 'none';
    }

    if (creditsSection) {
      creditsSection.style.display = 'none';
    }
  }
}

function getCurrentBidFromPage() {
  const currentBidElement = document.getElementById('currentBid');
  return currentBidElement
    ? parseFloat(currentBidElement.textContent.trim()) || 0
    : 0;
}

const listingId = getListingIdFromPage();
const currentBid = getCurrentBidFromPage();

setupBidButton(listingId, currentBid);
