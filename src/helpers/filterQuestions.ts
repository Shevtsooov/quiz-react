// import { geography } from '../data/geography';
// import { history } from '../data/history';
// import { sport } from '../data/sport';
// import { others } from '../data/others';
import { Question } from '../components/types/question';
import { getKeyByValue } from './getKeyByValue';
import { possibleCategories } from './PossibleCategories';

// export const categories = [history, geography, sport, others];

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
        ...questionsByCategory,
        ...questions
      ];
    }
  }
  
  return questions;
}

export const getRandomQuestions = (array: Question[], count: number) => {
  const shuffledArray = array.slice().sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, count);
};
