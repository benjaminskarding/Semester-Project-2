import { getUrlParam } from '../../utilities/geturlparam';
import { fetchListingById } from '../../api/listing/fetch';
import { startCountdown } from '../../utilities/countdown';

export function renderListings(listings) {
  const container = document.getElementById('listings-container');
  const paginationContainer = document.getElementById('pagination');

  if (!container) {
    console.error('Listings container not found!');
    return;
  }

  container.innerHTML = '';

  if (!listings || listings.length === 0) {
    container.innerHTML = `<div class="text-gray-500 mt-6 text-lg">
      <p>No results match your search.</p>
    </div>`;

    if (paginationContainer) {
      paginationContainer.style.display = 'none';
    }
    return;
  }

  if (paginationContainer) {
    paginationContainer.style.display = 'flex';
  }

  listings.forEach((listing) => {
    const { id, title, media, bids, _count, created } = listing;
    const mediaUrl =
      media.length > 0 ? media[0].url : 'public/images/placeholderimage2.jfif';

    const latestBid = bids?.length > 0 ? bids[bids.length - 1].amount : '0';

    const creationDate = new Date(created);
    const formattedDate = creationDate.toLocaleDateString();

    const listingHTML = `
      <div>
        <a href="/listing/?id=${id}">
          <img
            src="${mediaUrl}"
            alt="${title}"
            class="rounded-lg w-full h-40 object-cover"
          />
        </a>
        <div class="mt-2 text-left">
          <a href="/listing/?id=${id}" class="hover:text-[#FFD700]">
            <h4 class="font-medium truncate">${title}</h4>
          </a>
          <div class="text-sm font-normal text-[#E4E2D7] flex items-center justify-left space-x-1">
            <span>Current Bid</span>
            <img
              src="public/images/creditsIcon.svg"
              alt="coin icon"
              class="h-4 w-4"
            />
            <span>${latestBid}</span>
          </div>
          <p class="text-sm text-gray-500">Participants: ${
            _count?.bids || 0
          }</p>
          <p class="text-sm text-gray-500">Listed on: ${formattedDate}</p>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', listingHTML);
  });
}

export async function renderSingleListingPage() {
  const id = getUrlParam('id');
  if (!id) {
    console.error('No listing ID found in the URL.');
    return;
  }

  const listing = await fetchListingById(id);
  if (!listing) {
    console.error('Listing not found.');
    return;
  }

  document.title = listing.data.title || 'Listing Details';

  const titleElement = document.querySelector('#listing-title');
  const descriptionElement = document.querySelector('#listing-description');
  const imageElement = document.querySelector('#listing-image');
  const currentBidElement = document.querySelector('#current-bid');
  const closingInElement = document.querySelector('#closing-in');
  const previousBidsContainer = document.querySelector('#previous-bids');
  const bidButton = document.querySelector('#bidButton');
  const fallbackImage = '/public/images/placeholderimage2.jfif';

  titleElement.textContent = listing.data.title || 'No listing title';

  if (listing.data.description) {
    const sentences = listing.data.description
      .split('.')
      .filter((sentence) => sentence.trim() !== '');
    const formattedDescription = sentences
      .map((sentence, index) =>
        index === sentences.length - 1
          ? sentence.trim()
          : `${sentence.trim()}.<br><br>`
      )
      .join('');
    descriptionElement.innerHTML = formattedDescription;
  } else {
    descriptionElement.textContent = 'No description provided.';
  }

  imageElement.src =
    listing.data.media?.[0]?.url || 'public/images/placeholderimage2.jfif';
  imageElement.alt = listing.data.title || 'Listing Image';
  imageElement.onerror = () => {
    imageElement.src = fallbackImage;
  };

  const latestBid =
    listing.data.bids?.length > 0
      ? listing.data.bids[listing.data.bids.length - 1].amount
      : '0';

  currentBidElement.textContent = latestBid;

  const now = new Date();
  const closingTime = new Date(listing.data.endsAt);

  if (closingTime <= now) {
    closingInElement.textContent = 'Closed';
    closingInElement.classList.add('text-red-500', 'font-bold');
    if (bidButton) {
      bidButton.style.display = 'none';
    }
  } else {
    startCountdown(closingTime, 'closing-in', 'bidButton');
  }

  previousBidsContainer.innerHTML = '';
  if (listing.data.bids?.length > 0) {
    listing.data.bids.forEach((bid) => {
      previousBidsContainer.insertAdjacentHTML(
        'beforeend',
        `<li><span class="font-semibold">${
          bid.bidder.name || 'Anonymous'
        } :</span> ${bid.amount}</li>`
      );
    });
  } else {
    previousBidsContainer.innerHTML = '<li>No bids yet.</li>';
  }
}
