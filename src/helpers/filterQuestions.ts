import { Question } from '../types/question';
import { getKeyByValue } from './getKeyByValue';
import { possibleCategories } from './PossibleCategories';

export const filterQuestions = (
  questionsFromServer: Question[] | undefined,
  chosenCategories: string[],
  ): Question[] => {
  let questions: Question[] = [];

  const categoriesKeys = chosenCategories.map(category => getKeyByValue(possibleCategories, category));

  
  for (let i = 0; i < categoriesKeys.length; i++) {
    const chosenCategory = categoriesKeys[i];
    const questionsByCategory = questionsFromServer?.filter(question => question.category === chosenCategory);
    
    if (questionsByCategory) {
      questions = [
        ...questions,
        ...questionsByCategory
      ];
    }
  }
  
  return questions;
}

export const getRandomQuestions = (array: Question[], count: number) => {
  const shuffledArray = array.slice(); 

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, count);
};

