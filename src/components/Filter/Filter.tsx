import './Filter.scss';
import React, { useState } from 'react';

import cn from 'classnames';
import { categoryNames } from '../../helpers/PossibleCategories';

type Props = {
  setChosenCategories: React.Dispatch<React.SetStateAction<string[]>>,
  chosenCategories: string[],
  setPage: (page: number) => void,
}

export const Filter: React.FC<Props> = ({
  setChosenCategories,
  chosenCategories,
  setPage,
}) => {
  const [isWarning, setIsWarning] = useState(false);

  const handleChooseCategory = (chosenCategory: string) => {

    if (chosenCategories.includes(chosenCategory)) {
      setChosenCategories((prevState) => {
        return prevState.filter((category: string) => (
          category !== chosenCategory
          ))
      });

      return;
    }

    setChosenCategories(prevState => ([
      ...prevState,
      chosenCategory,
    ]))
  };

  const handleContinue = (page: number) => {
    if (chosenCategories.length === 0) {
      setIsWarning(true);
      setTimeout(() => {
        setIsWarning(false);
      }, 2500);

      return;
    }

    setPage(page);
  }

  return (
    <div className="filterPage">
      <h2
      className="filterPage__header"
      >
        Будь ласка, оберіть одну або декілька категорій:
      </h2>
      <div className="filterPage__categories">
        {categoryNames.map(category => (
          <button
          className={cn('filterPage__button', {
            'filterPage__button--chosen': chosenCategories.includes(category),
          })}
          key={category}
          onClick={() => {handleChooseCategory(category)}}
        >
          {category}
        </button>
        ))}
      </div>
      <button
        className="filterPage__button filterPage__button--next"
        onClick={() => handleContinue(1)}
      >
        Далі
      </button>
      <p
        className={cn('filterPage__warning', {
          'filterPage__warning--visible': isWarning,
        })}
        >
          Будь ласка, оберіть категорії
        </p>
    </div>
  );
}
