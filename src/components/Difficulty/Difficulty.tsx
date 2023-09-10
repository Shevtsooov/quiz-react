import { useEffect, useRef, useState } from 'react';
import './Sorting.scss';
import { categoryNames } from '../../helpers/PossibleCategories';
import classNames from 'classnames';

/* eslint-disable */
// interface Props {
//   title: string,
//   filter: string,
//   setFilter: (sorting: string) => void
//   setCurrentPage: (page: number) => void
// }

export const Sorting: React.FC = ({
  // title,
  // filter,
  // setFilter,
  // setCurrentPage,
}) => {
  const [droped, setDroped] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState('Всі категорії');
  const sortingRef = useRef<HTMLDivElement>(null);

  const handleClickOutside: EventListener = (event) => {
    const targetNode = event.target as Node;

    if (sortingRef.current && !sortingRef.current.contains(targetNode)) {
      setDroped(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleListDisplay = () => {
    if (droped) {
      setDroped(false);

      return;
    }

    setDroped(true);
  };

  const handleOptionClick = (option: string) => {
    setFilteredCategory(option);
    // setCurrentPage(1);
    setDroped(false);
  };

  return (
    <div
      className='sorting'
      ref={sortingRef}
    >
    </div>
  );
};
