export function setupPagination(currentPage, totalCount, limit, loadListings) {
  const paginationContainer = document.getElementById('pagination');

  if (!paginationContainer) {
    console.error('Pagination container not found!');
    return;
  }

  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(totalCount / limit);
  const maxButtonsToShow = 6;

  if (totalPages === 0) {
    paginationContainer.style.display = 'none';
    return;
  }

  paginationContainer.style.display = 'flex';

  const startPage = Math.max(
    Math.min(
      currentPage - Math.floor(maxButtonsToShow / 2),
      totalPages - maxButtonsToShow + 1
    ),
    1
  );
  const endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages);

  for (let page = startPage; page <= endPage; page++) {
    const button = document.createElement('button');
    button.textContent = page;
    button.className =
      page === currentPage
        ? 'bg-yellow-400 text-black px-4 py-2 rounded'
        : 'bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600';

    button.addEventListener('click', () => {
      loadListings(page);
    });

    paginationContainer.appendChild(button);
  }

  if (currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.className =
      'bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600';

    prevButton.addEventListener('click', () => {
      loadListings(currentPage - 1);
    });

    paginationContainer.insertBefore(
      prevButton,
      paginationContainer.firstChild
    );
  }

  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.className =
      'bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600';

    nextButton.addEventListener('click', () => {
      loadListings(currentPage + 1);
    });

    paginationContainer.appendChild(nextButton);
  }
}
