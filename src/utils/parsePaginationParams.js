export const parsePaginationParams = (query) => {
  const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc' } = query;

  const skip = (page - 1) * perPage;
  const limit = parseInt(perPage, 10);
  const currentPage = parseInt(page, 10);
  const sortOrderValue = sortOrder === 'asc' ? 1 : -1;

  return {
    skip,
    limit,
    sortBy,
    sortOrderValue,
    currentPage,
  };
};
