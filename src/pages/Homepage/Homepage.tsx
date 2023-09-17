import React, { useEffect, useMemo } from 'react';

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
  const gameCategories = useAppSelector((state) => state.gameCategories.value);
  const gameQuantity = useAppSelector((state) => state.gameQuantity.value);

  const { data: questions, refetch } = useGetAllQuestionsQuery();

  useEffect(() => {
    refetch();
  }, [questions, refetch]);

  const filteredQuestions = useMemo(() => filterQuestions(questions?.rows, gameCategories), [gameCategories, questions]);
  const readyQuestions = useMemo(() => getRandomQuestions(filteredQuestions, gameQuantity), [filteredQuestions, gameQuantity]);

  const question = readyQuestions[step];

  const isGameOver = step === readyQuestions.length && page > 1 && readyQuestions.length !== 0;

  return (
    <div className="gameboard">
      {page === 0 && (
        <Filter />
      )}
      {page === 1 && (
        <Quantity />
      )}
      {page > 1 && question && (
        <Game
          readyQuestions={readyQuestions}
          question={question}
        />
      )}
      {isGameOver && (
        <Result
          readyQuestions={readyQuestions}
        />
      )} 
    </div>
  );
}
