import './Filter.scss';
import React, { useState } from 'react';

import cn from 'classnames';
import { categoryNames } from '../../helpers/PossibleCategories';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setPage } from '../../features/page.slice';
import { useGetAllQuestionsQuery } from '../../services/questions.service';
import { filterGameCategories, setGameCategories } from '../../features/gameCategories.slice';

export const Filter: React.FC = () => {
  const { data: questions } = useGetAllQuestionsQuery();
  const gameCategories = useAppSelector((state) => state.gameCategories.value);
  const dispatch = useAppDispatch();

  const [isWarning, setIsWarning] = useState(false);

  const handleChooseCategory = (chosenCategory: string) => {

    if (gameCategories.includes(chosenCategory)) {
      dispatch(filterGameCategories(chosenCategory))

      return;
    }

    dispatch(setGameCategories(chosenCategory));
  };

  const handleContinue = () => {
    if (gameCategories.length === 0) {
      setIsWarning(true);
      setTimeout(() => {
        setIsWarning(false);
      }, 2500);

      return;
    }

    dispatch(setPage());
  }

  return (
    <div className="filterPage">
      <h2
      className={cn('filterPage__header', {
        'filterPage__header--warning': isWarning,
      })}
      >
        Будь ласка, оберіть одну або декілька категорій:
      </h2>
      <div className="filterPage__categories">
        {categoryNames.map(category => (
          <button
          className={cn('filterPage__button', {
            'filterPage__button--chosen': gameCategories.includes(category),
          })}
          key={category}
          onClick={() => {handleChooseCategory(category)}}
        >
          {`${category}: ${questions?.rows.filter((q) => q.categoryName === category).length}`}
        </button>
        ))}
      </div>
      <button
        className="filterPage__button filterPage__button--next"
        onClick={handleContinue}
      >
        Далі
      </button>
    </div>
  );
}
