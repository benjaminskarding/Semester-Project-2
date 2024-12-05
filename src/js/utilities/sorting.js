export function sortListings(listings, sortBy) {
  return listings.sort((a, b) => {
    switch (sortBy) {
      case 'created_desc':
        return new Date(b.created) - new Date(a.created);
      case 'created_asc':
        return new Date(a.created) - new Date(b.created);
      case 'endsAt_desc':
        return new Date(b.endsAt) - new Date(a.endsAt);
      case 'endsAt_asc':
        return new Date(a.endsAt) - new Date(b.endsAt);
      case 'bids_desc':
        return (b._count?.bids || 0) - (a._count?.bids || 0);
      case 'bids_asc':
        return (a._count?.bids || 0) - (b._count?.bids || 0);
      default:
        return 0;
    }
  });
}
