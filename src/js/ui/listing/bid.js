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
