import { placeBid } from '../../api/listing/bid';
import { getCurrentUser } from '../../utilities/authGuard';

export function setupBidButton(listingId, currentBid, initialBids = []) {
  const bidSection = document.getElementById('bidSection');
  const bidButton = document.getElementById('bidButton');

  if (!bidSection || !bidButton) {
    console.error('Bid section or button not found.');
    return;
  }

  let bids = [...initialBids];

  bidButton.addEventListener('click', () => {
    if (!document.getElementById('bidInput')) {
      const bidInput = document.createElement('input');
      bidInput.type = 'number';
      bidInput.id = 'bidInput';
      bidInput.placeholder = 'Enter your bid';
      bidInput.className =
        'text-center py-2 text-black rounded border border-gray-300 w-full max-w-xs mt-2';

      bidSection.appendChild(bidInput);

      bidButton.textContent = 'Submit Bid';

      bidButton.onclick = async () => {
        const bidAmount = parseFloat(bidInput.value.trim());

        if (isNaN(bidAmount) || bidAmount <= currentBid) {
          alert(
            `Please enter a valid bid amount greater than the current bid of ${currentBid}.`
          );
          return;
        }

        try {
          await placeBid(listingId, bidAmount);

          alert('Bid placed successfully!');

          const currentUser = getCurrentUser();
          if (currentUser) {
            bids.push({
              bidder: { name: currentUser.username },
              amount: bidAmount,
            });
          }

          bidButton.textContent = 'Make Bid';
          bidInput.remove();
          bidButton.onclick = null;
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (error) {
          alert(error.message || 'Failed to place bid. Please try again.');
          console.error('Error placing bid:', error);
        }
      };
    }
  });
}

export function updateUserBidStatus(listing) {
  const currentUser = getCurrentUser();
  const bidStatusElement = document.getElementById('bidStatus');

  if (!currentUser || !listing || !listing.data || !listing.data.bids) {
    console.warn('Required data for bid status is missing.');
    return;
  }

  const latestBid = listing.data.bids[listing.data.bids.length - 1] || null;

  const userIsLeading =
    latestBid && latestBid.bidder?.name === currentUser.username;

  // If the user has not made a bid or is not leading, remove the element
  if (
    !userIsLeading &&
    !listing.data.bids.some((bid) => bid.bidder?.name === currentUser.username)
  ) {
    if (bidStatusElement) {
      bidStatusElement.remove();
    }
    return;
  }

  let statusElement = bidStatusElement;
  if (!statusElement) {
    statusElement = document.createElement('div');
    statusElement.id = 'bidStatus';
    const currentBidContainer = document.querySelector(
      '#current-bid-container'
    );
    if (currentBidContainer) {
      currentBidContainer.appendChild(statusElement);
    } else {
      console.warn('Current bid container not found.');
      return;
    }
  }

  // Update the UI based on the user's bid status
  if (userIsLeading) {
    statusElement.textContent = `Your bid is currently leading`;
    statusElement.className = 'text-green-500 font-bold pt-3';
  } else {
    statusElement.textContent = 'You have been outbid';
    statusElement.className = 'text-red-500 font-bold pt-3';
  }
}
