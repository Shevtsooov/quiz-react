import './Filter.scss';
import React, { useState } from 'react';

import cn from 'classnames';
import { categoryNames } from '../../helpers/PossibleCategories';
import { useAppDispatch } from '../../app/store';
import { increment } from '../../features/page.slice';
import { useGetAllQuestionsQuery } from '../../services/questions.service';

type Props = {
  setChosenCategories: React.Dispatch<React.SetStateAction<string[]>>,
  chosenCategories: string[],
}

export const Filter: React.FC<Props> = ({
  setChosenCategories,
  chosenCategories,
}) => {
  const { data: questions } = useGetAllQuestionsQuery(); 
  const dispatch = useAppDispatch();

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

  const handleContinue = () => {
    if (chosenCategories.length === 0) {
      setIsWarning(true);
      setTimeout(() => {
        setIsWarning(false);
      }, 2500);

      return;
    }

    dispatch(increment());
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
