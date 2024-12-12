import { getUrlParam } from '../../utilities/getUrlParam';
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
      media.length > 0 ? media[0].url : '/images/placeholderimage2.jfif';

    const latestBid = bids?.length > 0 ? bids[bids.length - 1].amount : '0';

    const creationDate = new Date(created);
    const formattedDate = creationDate.toLocaleDateString();

    const listingHTML = `
      <div>
        <a href="/listing/?id=${id}">
          <img
            src="${mediaUrl}"
            alt="${title}"
            class="rounded-sm w-full h-80 object-cover"
          />
        </a>
        <div class="mt-2 text-left">
          <a href="/listing/?id=${id}" class="hover:text-[#FFD700]">
            <h4 class="font-medium truncate">${title}</h4>
          </a>
          <div class="text-sm font-normal text-[#E4E2D7] flex items-center justify-left space-x-1">
            <span>Current Bid</span>
            <img
              src="/images/creditsIcon.svg"
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

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const listingTitle = listing.data.title || 'This listing';
    metaDescription.setAttribute(
      'content',
      `Bid on ${listingTitle} now! View bid history, check your credits, track listing expiration, and stay updated on your bid status.`
    );
  }

  const titleElement = document.querySelector('#listing-title');
  const descriptionElement = document.querySelector('#listing-description');
  const imageElement = document.querySelector('#listing-image');
  const currentBidElement = document.querySelector('#current-bid');
  const closingInElement = document.querySelector('#closing-in');
  const previousBidsContainer = document.querySelector('#previous-bids');
  const bidButton = document.querySelector('#bidButton');
  const prevButton = document.querySelector('#prevImage');
  const nextButton = document.querySelector('#nextImage');
  const fallbackImage = '/images/placeholderimage2.jfif';

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

  // Image navigation
  const media = listing.data.media || [];
  let currentImageIndex = 0;

  const updateImage = () => {
    if (media.length > 0) {
      imageElement.src = media[currentImageIndex]?.url || fallbackImage;
      imageElement.alt = media[currentImageIndex]?.alt || 'Listing Image';
    } else {
      imageElement.src = fallbackImage;
      imageElement.alt = 'No images available';
    }
  };
  updateImage();

  if (media.length > 1) {
    prevButton.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + media.length) % media.length;
      updateImage();
    });

    nextButton.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % media.length;
      updateImage();
    });
  }

  // Set current bid
  const latestBid =
    listing.data.bids?.length > 0
      ? listing.data.bids[listing.data.bids.length - 1].amount
      : '0';
  currentBidElement.textContent = latestBid;

  // Countdown timer
  const now = new Date();
  const closingTime = new Date(listing.data.endsAt);

  if (closingTime <= now) {
    closingInElement.textContent = 'Closed';
    closingInElement.classList.add('text-red-500');
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
        `<li><span class="font-medium">${
          bid.bidder.name || 'Anonymous'
        } :</span> ${bid.amount}</li>`
      );
    });
  } else {
    previousBidsContainer.innerHTML = '<li>No bids yet.</li>';
  }
}
