import { createListing } from '../../api/listing/create';

export function setupCreateListing() {
  const form = document.getElementById('createListingForm');
  const mediaInputsContainer = document.getElementById('mediaInputs');
  const addMediaButton = document.getElementById('addMediaButton');

  if (!form) {
    console.error('Create Listing form not found');
    return;
  }

  let mediaInputCount = 1;

  // Add new media input fields dynamically
  addMediaButton.addEventListener('click', () => {
    const newMediaInput = document.createElement('input');
    newMediaInput.type = 'url';
    newMediaInput.id = `media-url-${mediaInputCount}`;
    newMediaInput.name = 'media-urls';
    newMediaInput.placeholder = 'Media URL (multiple images are optional)';
    newMediaInput.className =
      'p-2 border border-gray-300 rounded placeholder-black text-black w-full';
    newMediaInput.setAttribute(
      'aria-label',
      `Enter media URL ${mediaInputCount + 1}`
    );

    mediaInputsContainer.appendChild(newMediaInput);
    mediaInputCount++;
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const duration = parseInt(document.getElementById('duration').value, 10);
    const tags = document
      .getElementById('tags')
      .value.split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    // Collect all media inputs
    const mediaUrls = Array.from(
      document.querySelectorAll('input[name="media-urls"]')
    )
      .map((input) => ({ url: input.value.trim() }))
      .filter((media) => media.url);

    // Validate fields
    if (!title || !duration || isNaN(duration) || duration <= 0) {
      alert('Please provide a valid title and duration (in hours).');
      return;
    }

    if (mediaUrls.some((media) => !media.url.startsWith('http'))) {
      alert('Please provide valid media URLs (starting with http or https).');
      return;
    }

    // Construct listing data
    const now = new Date();
    const endsAt = new Date(
      now.getTime() + duration * 60 * 60 * 1000
    ).toISOString();

    const listingData = {
      title,
      description,
      endsAt,
      media: mediaUrls,
      tags,
    };

    console.log('Sending data to API:', listingData);

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;

    try {
      await createListing(listingData);
      alert('Listing created successfully!');

      window.location.href = '/';
      form.reset();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'An unexpected error occurred.';
      alert(`Failed to create listing: ${errorMessage}`);
      console.error('Error:', error);
    } finally {
      submitButton.disabled = false;
    }
  });
}
