/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  getQuestionsList,
  getQuestionsByCategory
} from '../controllers/questions.controller';

export const questionsRoutes = express.Router();

questionsRoutes.get('/questions', express.json(), getQuestionsList);
questionsRoutes.get('/questions/:category', express.json(), getQuestionsByCategory);
