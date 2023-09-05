import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header/Header';
import { Homepage } from './pages/Homepage/Homepage';
import { QuestionList } from './pages/QuestionList/QuestionList';
import { PageNotFound } from './pages/NotFoundPage/NotFoundPage';
import { AddNewQuestion } from './pages/AddNewQuestion/AddNewQuestion';

export const App: React.FC = () => {

  return (
    <>
      <Header />

      <Routes>
        <Route path="home" element={<Homepage />} />
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="questions" element={<QuestionList />} />

        <Route path="new-question" element={<AddNewQuestion />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>  
  );
}
