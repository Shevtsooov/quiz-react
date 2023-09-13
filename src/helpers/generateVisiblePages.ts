export const generateVisiblePages = (
  currentPage: number,
  totalPages: number,
  visibleCount: number,
): number[] => {
  const halfVisible = Math.floor(visibleCount / 2);
  let startPage = Math.max(currentPage - halfVisible, 1);
  const endPage = Math.min(startPage + visibleCount - 1, totalPages);

  if (endPage - startPage + 1 < visibleCount) {
    startPage = Math.max(endPage - visibleCount + 1, 1);
  }

  return Array.from({
    length: endPage - startPage + 1,
  }, (_, index) => startPage + index);
};
