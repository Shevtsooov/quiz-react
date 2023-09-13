import React from 'react';
import cn from 'classnames';
import './Pagination.scss';
import {
  generateVisiblePages,
} from '../../helpers/generateVisiblePages';

/* eslint-disable */
interface Props {
  total: number,
  currentPage: number
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / 20);
  const visiblePages = generateVisiblePages(
    currentPage,
    totalPages,
    5, // number of pages to show
  );

  const handlePageChange = (page: number) => {
    if (currentPage !== page && page >= 1 && page <= totalPages) {
      onPageChange(page);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <ul className="pagination">
      <li className={
        cn('pagination__page-item pagination__page-item--prev-page', {
          'pagination__page-item--inActive': currentPage <= 1,
        })}
      >
        <a
          className="pagination__page-link"
          aria-disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
        </a>
      </li>
      {visiblePages.map(page => (
        <li
          className={cn('pagination__page-item', {
            'pagination__page-item--active': currentPage === page,
          })}
          key={page}
        >
          <a
            className="pagination__page-link"
            // href={`#${page}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={
        cn('pagination__page-item pagination__page-item--next-page', {
          'pagination__page-item--inActive': currentPage === totalPages,
        })}
      >
        <a
          className="pagination__page-link"
          // href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
        </a>
      </li>
    </ul>
  );
};
