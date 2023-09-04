import React, { useState } from 'react';
import cn from 'classnames';
import './Game.scss'
import { Question } from '../types/question';

type Props = {
  readyQuestions: Question[]
  question: Question
  step: number
  setStep: (step: number) => void
  correct: number
  setCorrect: (index: number) => void
}

export const Game: React.FC<Props> = ({
  readyQuestions,
  question,
  step,
  setStep,
  correct,
  setCorrect,
}) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [isInCorrect, setIsInCorrect] = useState(false);
  const [clickedAnswerIndex, setClickedAnswerIndex] = useState(0);

  const onAnswerClick = (index: number) => {
    setTimeout(() => {
      setStep(step + 1)
      setIsInCorrect(false)
      setIsCorrect(false)
    }, 1000)
    

    if (index === question.correct) {
      setIsCorrect(true);
      setCorrect(correct + 1);
    }

    if (index !== question.correct) {
      setClickedAnswerIndex(index);
      setIsInCorrect(true);
    }
  }
  
  const percentage = Math.round(step / readyQuestions.length * 100);

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
              'game__question--clicked-correct': isCorrect && index === question.correct,
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
