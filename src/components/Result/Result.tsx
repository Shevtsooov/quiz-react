import React from 'react';
import './Result.scss'
import { Question } from '../../types/question';
import { chooseReactionForResult } from '../../helpers/chooseReactionForResult';

type Props = {
  readyQuestions: Question[]
  correct: number
}

export const Result: React.FC<Props> = ({
  readyQuestions,
  correct,
}) => {

  const { imgSrc, congratText } = chooseReactionForResult(correct, readyQuestions.length)

  return (
    <div className="resultPage">
      <img
        className="resultPage__img"
        src={`${imgSrc}`}
        alt="Congratulations"
      />
      <h2 className="resultPage__header">
        {congratText}</h2>
      <a href="/">
        <button className="resultPage__button">Спробувати знову</button>
      </a>
    </div>
  );
}
