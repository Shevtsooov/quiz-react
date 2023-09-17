import React, { useState } from 'react';
import cn from 'classnames';

import './Quantity.scss';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setPage } from '../../features/page.slice';
import { setGameQuantity } from '../../features/gameQuantity.slice ';

export const Quantity: React.FC = () => {
  const gameQuantity = useAppSelector((state) => state.gameQuantity.value);
  const dispatch = useAppDispatch();

  const [isWarning, setIsWarning] = useState(false);

  const handleChooseQuantity = (chosenQuantity: number) => {
    if (gameQuantity === chosenQuantity) {
      dispatch(setGameQuantity(0));
      
      return;
    }

    dispatch(setGameQuantity(chosenQuantity));
  };

  const handleStartGame = (page: number) => {
    if (gameQuantity === 0) {
      setIsWarning(true);
      setTimeout(() => {
        setIsWarning(false);
      }, 2500);

      return;
    }

    dispatch(setPage());
  }

  return (
    <div className="quantityPage">
      <h2
        className={cn('quantityPage__header', {
          'quantityPage__header--warning': isWarning,
        })}
      >
        Оберіть кількість питань:
      </h2>
      <div className="quantityPage__categories">
        <button
          className={cn('quantityPage__button', {
            'quantityPage__button--chosen': gameQuantity === 5,
          })}
          onClick={() => {handleChooseQuantity(5)}}
        >
          5
        </button>
        <button
          className={cn('quantityPage__button', {
            'quantityPage__button--chosen': gameQuantity === 10,
          })}
          onClick={() => {handleChooseQuantity(10)}}
        >
          10
        </button>
        <button
          className={cn('quantityPage__button', {
            'quantityPage__button--chosen': gameQuantity === 15,
          })}
          onClick={() => {handleChooseQuantity(15)}}
        >
          15
        </button>
        <button
          className={cn('quantityPage__button', {
            'quantityPage__button--chosen': gameQuantity === 20,
          })}
          onClick={() => {handleChooseQuantity(20)}}
        >
          20
        </button>
      </div>
      <button
        className="quantityPage__button quantityPage__button--next"
        onClick={() => handleStartGame(2)}
      >
        Почати
      </button>
    </div>
  );
}
