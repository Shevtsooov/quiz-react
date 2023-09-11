import React from 'react';
import cn from 'classnames';
import './Game.scss'
import { Question } from '../types/question';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { increment } from '../../features/step.slice';
import { setInCorrect } from '../../features/isInCorrect.slice';
import { setIsCorrect } from '../../features/isCorrect.slice'
import { setClickedAnswerIndex } from '../../features/clickedAnswerIndex.slice';

type Props = {
  readyQuestions: Question[]
  question: Question
  correct: number
  setCorrect: (index: number) => void
}

export const Game: React.FC<Props> = ({
  readyQuestions,
  question,
  correct,
  setCorrect,
}) => {
  const step = useAppSelector((state) => state.step.value)
  const isCorrect = useAppSelector((state) => state.isCorrect.value)
  const isInCorrect = useAppSelector((state) => state.isInCorrect.value)
  const clickedAnswerIndex = useAppSelector((state) => state.clickedAnswerIndex.value)
  const dispatch = useAppDispatch();

  const onAnswerClick = (index: number) => {
    setTimeout(() => {
      dispatch(increment());
      dispatch(setInCorrect(false));
      dispatch(setIsCorrect(false));
      dispatch(setClickedAnswerIndex(null));
    }, 1000)


    if (index === question.correctAnswer) {
      dispatch(setIsCorrect(true));
      setCorrect(correct + 1);
    }

    if (index !== question.correctAnswer) {
      dispatch(setClickedAnswerIndex(index));
      dispatch(setInCorrect(true));
    }
  }
  
  const percentage = Math.round(step / readyQuestions.length * 100);

  console.log(typeof question.answers);
  console.log(question);
  console.log(question.answers);

  return (
    <>
      <div className="game__progress">
        <div style={{ width:`${percentage}%` }} className="game__progress--inner"></div>
      </div>
      <h1 className="game__question--title">{question.title}</h1>
      <ul className="game__question_list">
        {question.answers.map((answer, index) => (
          <li
            key={answer}
            onClick={() => onAnswerClick(index)}
            className={cn('game__question',{
              'game__question--clicked-correct': isCorrect && index === question.correctAnswer,
              'game__question--clicked-inCorrect': isInCorrect && index === clickedAnswerIndex,
            })}
          >
            {answer}
          </li>
        ))}
      </ul>
    </>
  );
}
