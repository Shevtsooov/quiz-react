import { FormEvent, useState } from "react";
import cn from "classnames";
import './AddNewQuestion.scss';
import { categoryNames, possibleCategories } from "../../helpers/PossibleCategories";
import { getKeyByValue } from "../../helpers/getKeyByValue";

const difficultyLevels = ['Легко', 'Нормально', 'Складно']

export const AddNewQuestion = () => {
  const [title, setTitle] = useState<string>('');
  const [answers, setAnswers] = useState(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [chosenCategory, setChosenCategory] = useState<string | null>(null)
  const [chosenDifficulty, setChosenDifficulty] = useState<string | null>(null)

  const titleLimit = 120;
  const answerLimit = 60;
  
  // ADD TITLE

  const addTitle = (title: string) => {
    if (title.length === titleLimit + 1) {
      return;
    }
    setTitle(title.charAt(0).toUpperCase() + title.slice(1));
  };

  const clearTitle = () => {
    setTitle('');
  }
  
  // ADD INPUT

  const addNewInput = (action: string, i: number) => {
    if (action === '+') {
      if (answers.length === 4) {
        return;
      }
      setAnswers(state => [...state, ''])

      return;
    }

    setAnswers((state) => {
      const updatedAnswers = [...state];
      return updatedAnswers.filter((answer, index) => (
        index !== i
      ))
    });
    setCorrectAnswer(null);
  }

  // ADD ANSWER

  const addAnswer = (e: string, i: number) => {
    if (e.length === answerLimit) {
      return;
    }
    setAnswers((state) => {
      const updatedAnswers = [...state];
      updatedAnswers[i] = e.charAt(0).toUpperCase() + e.slice(1);
      return updatedAnswers;
    });
  }

  const clearAnswer = (i:number) => {
    setAnswers((state) => {
      return state.map((answer, index) => {
        return index === i
          ? ''
          : answer
      }
    )});
    setCorrectAnswer(null);
  }

  //CHOOSE CORRECT

  const addCorrect = (index: string) => {
    if (answers.includes('')) {
      alert('answers cannot be empty');

      return;
    }

    if (correctAnswer === index) {
      setCorrectAnswer(null);

      return;
    }
    setCorrectAnswer(index);
  }
  
  //CHOOSE CATEGORY

  const chooseCategory = (category: string) => {
    if (chosenCategory === category) {
      setChosenCategory(null);

      return;
    }

    setChosenCategory(category);
  }

  //CHOOSE DIFFICULTY

  const chooseDifficulty = (difficulty: string) => {
    if (chosenDifficulty === difficulty) {
      setChosenDifficulty(null);

      return;
    }

    setChosenDifficulty(difficulty);
  }

  //HANDLE SUBMIT

  const handleSubmit = (
    event: FormEvent
  ) => {
    event.preventDefault();
    
    if (!title.trim() 
      || !correctAnswer
      || !chosenCategory
      || !chosenDifficulty) {
        console.log(' питання')

        return;
      }
    if (title.length < 10) {
      // alert('Закоротке питання')
      console.log('Закоротке питання')
    }

    const newQuestion = {
      title,
      answers,
      correctAnswer: answers.indexOf(correctAnswer),
      category: getKeyByValue(possibleCategories, chosenCategory),
      categoryName: chosenCategory,
      difficulty: chosenDifficulty
    }
    
    console.log(newQuestion)

    setTitle('');
    setAnswers(['', '']);
    setCorrectAnswer(null);
    setChosenCategory(null);
    setChosenDifficulty(null);
  }

  // console.log(title)
  
  return (
    <div className="form">
    <form onSubmit={handleSubmit}>
      <div className='form__title'>
        <textarea
          className='form__title_textarea'
          spellCheck='false'
          maxLength={titleLimit}
          placeholder="Напишіть своє питання"
          value={title}
          onChange={(e) => addTitle(e.target.value)}
        />
        <span className='form__title_limit'>{`${title.length}/${titleLimit}`}</span>
        <button
          type="button"
          className={cn('form__title_clear', {
            'form__title_clear--hidden': title === ''
          })}
          onClick={clearTitle}
        >X</button>
      </div>

      <p className='form__label'>Вкажіть можливі та вірну відповіді:</p>
      {answers.map((el, i) => (
        <div key={i} className='form__answers'>
          <input
            type="text"
            className='form__answer'
            style={{width: `${answers[i].length * 2 + 0}ch`}}
            placeholder={`${i + 1} варіант`}
            maxLength={answerLimit}
            value={answers[i]}
            onChange={(e) => addAnswer(e.target.value, i)}
          />

          <button
            type="button"

            className={answers[i] !== correctAnswer 
              ? 'form__answers--wrong'
              : 'form__answers--correct'
            }
            onClick={() => addCorrect(answers[i])}
          />

          <button
            type="button"
            onClick={() => clearAnswer(i)}
            className={cn('form__answer_button form__answer_button-clear', {
              'form__answer_button-clear--hidden': answers[i] === ''
            })}
          >
            X
          </button>

          <button
            type="button"
            onClick={() => addNewInput('-', i)}
            className={cn('form__answer_button form__answer_button-minus', {
              'form__answer_button-minus--hidden': answers.length === 2
            })}
          >
            -
          </button>

          <button 
            type="button"
            onClick={() => addNewInput('+', i)}
            className={cn('form__answer_button form__answer_button-plus', {
              'form__answer_button-plus--hidden': answers.length === 4 || i + 1 !== answers.length
            })}
          >
            +
          </button>
        </div>
      ))}
      
      <p className='form__label'>Оберіть відповідну категорію:</p>
      <div className="form_categories">
        {categoryNames.map(category => (
          <button
            type="button"
            className={cn('form_categories__item', {
              'form_categories__item--active': chosenCategory === category
            })}
            key={category}
            onClick={() => chooseCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <p className='form__label'>Визначте складність питання:</p>
      <div className="form_categories">
        {difficultyLevels.map(difficulty => (
          <button
            type="button"
            className={cn('form_categories__item', {
              'form_categories__item--active': chosenDifficulty === difficulty
            })}
            key={difficulty}
            onClick={() => chooseDifficulty(difficulty)}
          >
            {difficulty}
          </button>
        ))}
      </div>

      <button
        type="submit"
        className="form__submit_button"
      >
        Додати питання
      </button>
    </form>
  </div>
  );
};

