import { useEffect, useRef, useState } from 'react';
import './Sorting.scss';
import { categoryNames } from '../../helpers/PossibleCategories';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setFilteredCategory } from '../../features/filteredCategory.slice';

type Props = {
  setCurrentPage: (page: number) => void
}

export const Sorting: React.FC<Props> = ({ setCurrentPage }) => {
  const [droped, setDroped] = useState(false);
  const filteredCategory = useAppSelector(state => state.filteredCategory.value);
  const dispatch = useAppDispatch();

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
    dispatch(setFilteredCategory(option));
    setDroped(false);
    setCurrentPage(1);
  };

  return (
    <div
    className='sorting'
      ref={sortingRef}
    >
      <div
        
        className={classNames('sorting__select', {
          'sorting__select-col': droped
        })}
        onClick={handleListDisplay}
      >
        <p className='sorting__select--default'>
          {filteredCategory}
        </p>
      </div>
      {droped && (
        <ul className='sorting__select-items'>
              {filteredCategory !== 'Всі категорії' && (
              <li
                className='sorting__item'
                onClick={() => handleOptionClick('Всі категорії')}
              >
                Всі категорії
              </li>)}
          {categoryNames.map(option => (
              <li
                className='sorting__item'
                key={option}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
