import React, { useEffect, useMemo, useState } from 'react';

import { Filter } from '../../components/Filter/Filter';
import { Quantity } from '../../components/Quantity/Quantity';
import { Game } from '../../components/Game/Game';
import { Result } from '../../components/Result/Result';

import { filterQuestions, getRandomQuestions } from '../../helpers/filterQuestions';

import './Homepage.scss';
import { useAppSelector } from '../../app/store';
import { useGetAllQuestionsQuery } from '../../services/questions.service';

export const Homepage: React.FC = () => {
  const step = useAppSelector((state) => state.step.value);
  const page = useAppSelector((state) => state.page.value);
  const { data: questions, refetch } = useGetAllQuestionsQuery();
  
  const [correct, setCorrect] = useState(0);
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(0);
  
  // useEffect(() => {
  //   refetch();
  // }, [questions, refetch]);

  const filteredQuestions = useMemo(() => filterQuestions(questions?.rows, chosenCategories), [chosenCategories, questions]);
  const readyQuestions = useMemo(() => getRandomQuestions(filteredQuestions, quantity), [filteredQuestions, quantity]);

  const question = readyQuestions[step];

  const isGameOver = step === readyQuestions.length && page > 1;

  return (
    <div className="gameboard">
      {page === 0 && (
        <Filter 
          setChosenCategories={setChosenCategories}
          chosenCategories={chosenCategories}
        />
      )}
      {page === 1 && (
        <Quantity 
          setQuantity={setQuantity}
          quantity={quantity}
        />
      )}
      {page > 1 && question && (
        <Game
          readyQuestions={readyQuestions}
          question={question}
          correct={correct}
          setCorrect={setCorrect}
        />
      )}
      {isGameOver && (
        <Result
          readyQuestions={readyQuestions}
          correct={correct}
        />
      )} 
    </div>
  );
}
