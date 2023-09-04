import { geography } from '../data/geography';
import { history } from '../data/history';
import { sport } from '../data/sport';
import { others } from '../data/others';
import { Question } from '../components/types/question';

const categories = [history, geography, sport, others];

export const filterQuestions = (chosenCategories: string[]): Question[] => {
  let questions: Question[] = [];
  
  for (let i = 0; i < chosenCategories.length; i++) {
    const chosenCategory = chosenCategories[i];
    const category = categories.find(category => category.title === chosenCategory);
    
    if (category) {
      questions = [
        ...questions,
        ...category.questions,
      ];
    }
  }
  
  return questions;
}

export const getRandomQuestions = (array: Question[], count: number) => {
  const shuffledArray = array.slice().sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, count);
};
