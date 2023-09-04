import React, { useState, useMemo } from 'react';
import './App.scss';

import { Game } from './components/Game/Game';
import { Filter } from './components/Filter/Filter';
import { Quantity } from './components/Quantity/Quantity';
import { filterQuestions, getRandomQuestions } from './helpers/filterQuestions';
import { Result } from './components/Result/Result';

export const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [page, setPage] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(0);

  const filteredQuestions = useMemo(() => filterQuestions(chosenCategories), [chosenCategories]);
  const readyQuestions = useMemo(() => getRandomQuestions(filteredQuestions, quantity), [filteredQuestions, quantity]);

 const question = readyQuestions[step];
 
  const isGameOver = step === readyQuestions.length && page > 1;

  return (
    <div className="App">
      {page === 0 && (
      <Filter 
        setChosenCategories={setChosenCategories}
        chosenCategories={chosenCategories}
        setPage={setPage}
      />
    )}
      {page === 1 && (
      <Quantity 
        setQuantity={setQuantity}
        quantity={quantity}
        setPage={setPage}
      />
    )}
      {page > 1 && question && (
        <Game
        readyQuestions={readyQuestions}
          question={question}
          step={step}
          setStep={setStep}
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
