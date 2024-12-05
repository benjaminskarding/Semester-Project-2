import { createListing } from '../../api/listing/create';

export function setupCreateListing() {
  const form = document.getElementById('createListingForm');

  if (!form) {
    console.error('Create Listing form not found');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const duration = parseInt(document.getElementById('duration').value, 10);
    const mediaUrls = document
      .getElementById('mediaUrls')
      .value.split(',')
      .map((url) => url.trim())
      .filter((url) => url);
    const tags = document
      .getElementById('tags')
      .value.split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    if (!title || !duration || isNaN(duration) || duration <= 0) {
      alert('Please provide a valid title and duration (in hours).');
      return;
    }

    if (mediaUrls.some((url) => !url.startsWith('http'))) {
      alert('Please provide valid media URLs (starting with http or https).');
      return;
    }

    const now = new Date();
    const endsAt = new Date(
      now.getTime() + duration * 60 * 60 * 1000
    ).toISOString();

    const listingData = {
      title,
      description,
      endsAt,
      media: mediaUrls.map((url) => ({ url })),
      tags,
    };

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;

    try {
      const createdListing = await createListing(listingData);
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
