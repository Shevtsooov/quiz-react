// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { Request, Response } from 'express';
import { Questions } from '../models/questions/questions.model';

export const getQuestionsList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const questions = await Questions.findAll();

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getQuestionsByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category } = req.params;

    const questions = await Questions.findAll({
      raw: true,
      where: {
        category
      }
    });

    const availableCategories = new Set(questions.map(question => question.category));

    if (!availableCategories.has(category)) {
      res.status(404).json({ error: 'На жаль, такої категорії не існує, або ж ви помилилися у її написанні' });
    }

    res.json([...questions, ...availableCategories]);
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};
