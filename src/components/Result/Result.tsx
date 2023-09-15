import React from 'react';
import './Result.scss'
import { Question } from '../../types/question';
import { chooseReactionForResult } from '../../helpers/chooseReactionForResult';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { resetPage } from '../../features/page.slice';
import { resetSteps } from '../../features/step.slice';
import { resetGameCategoriess } from '../../features/gameCategories.slice';
import { resetGameQuantity } from '../../features/gameQuantity.slice ';
import { resetGameCorrectAnswers } from '../../features/gameCorrectAnswers.slice ';

type Props = {
  readyQuestions: Question[]
}

export const Result: React.FC<Props> = ({
  readyQuestions,
}) => {
  const gameCorrectAnswers = useAppSelector(state => state.gameCorrectAnswers.value);

  const dispatch = useAppDispatch();

  const resetGame = () => {
    dispatch(resetSteps());
    dispatch(resetPage());
    dispatch(resetGameCategoriess());
    dispatch(resetGameQuantity());
    dispatch(resetGameCorrectAnswers());
  }

  const { imgSrc, congratText } = chooseReactionForResult(gameCorrectAnswers, readyQuestions.length)

  return (
    <div className="resultPage">
      <img
        className="resultPage__img"
        src={`${imgSrc}`}
        alt="Congratulations"
      />
      <h2 className="resultPage__header">
        {congratText}</h2>
  
        <button
          className="resultPage__button"
          onClick={resetGame}
        >
          Спробувати знову
        </button>
    </div>
  );
}
