import { FormEvent, useState } from "react";
import cn from "classnames";
import './AddNewQuestion.scss';
import { categoryNames, possibleCategories } from "../../helpers/PossibleCategories";
import { getKeyByValue } from "../../helpers/getKeyByValue";
import {
  useAddQuestionMutation,
  useEditQuestionMutation,
  useGetAllQuestionsQuery,
} from "../../services/questions.service";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setTitle } from "../../features/title.slice";
import {
  addNewField,
  clearInput,
  removeField,
  setAnswers,
  setDefaultAnswers,
} from "../../features/answers.slice";
import { setCorrectAnswer } from "../../features/correctAnswer.slice";
import { setChosenCategory } from "../../features/chosenCategory.slice";
import { setChosenDifficulty } from "../../features/chosenDifficulty.slice";

const difficultyLevels = ['Легко', 'Нормально', 'Складно']

export const AddNewQuestion = () => {
  const editedQuestionId = useAppSelector((state) => state.editedQuestionId.value);
  const title = useAppSelector((state) => state.title.value);
  const answers = useAppSelector((state) => state.answers.value);
  const correctAnswer = useAppSelector((state) => state.correctAnswer.value);
  const chosenCategory = useAppSelector((state) => state.chosenCategory.value);
  const chosenDifficulty = useAppSelector((state) => state.chosenDifficulty.value);
  const [isExampleVisible, setIsExampleVisible] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: questions, refetch } = useGetAllQuestionsQuery();
  const dispatch = useAppDispatch();

  const [addQuestion] = useAddQuestionMutation();
  const [editQuestion] = useEditQuestionMutation();

  const titleLimit = 120;
  const answerLimit = 60;
  
  // ADD TITLE

  const addTitle = (title: string) => {
    if (title.length === titleLimit + 1) {
      return;
    }
    dispatch(setTitle(title.charAt(0).toUpperCase() + title.slice(1)));
  };

  const clearTitle = () => {
    dispatch(setTitle(''));
  }
  
  // ADD INPUT

  const addNewInput = (action: string, i: number) => {
    if (action === '+') {
      if (answers.length === 4) {
        return;
      }
      dispatch(addNewField());

      return;
    }

    dispatch(removeField(i));
    dispatch(setCorrectAnswer(null));
  }

  // ADD ANSWER

  const addAnswer = (index: number, value: string) => {
    if (value.length === answerLimit) {
      return;
    }

    dispatch(setAnswers({ index, value }));
  }

  const clearAnswer = (i:number) => {
    dispatch(clearInput(i));
    dispatch(setCorrectAnswer(null));
  }

  //CHOOSE CORRECT

  const addCorrect = (index: string) => {
    if (answers.includes('')) {
      alert('answers cannot be empty');

      return;
    }

    if (correctAnswer === index) {
      dispatch(setCorrectAnswer(null));

      return;
    }
    dispatch(setCorrectAnswer(index));
  }
  
  //CHOOSE CATEGORY

  const chooseCategory = (category: string) => {
    if (chosenCategory === category) {
      dispatch(setChosenCategory(null));

      return;
    }

    dispatch(setChosenCategory(category));
  }

  //CHOOSE DIFFICULTY

  const chooseDifficulty = (difficulty: string) => {
    if (chosenDifficulty === difficulty) {
      dispatch(setChosenDifficulty(null));

      return;
    }

    dispatch(setChosenDifficulty(difficulty));
  }

  //HANDLE SUBMIT

  const handleSubmit = async (
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
      console.log('Закоротке питання');

      return;
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

    try {
      if (editedQuestionId && questions?.rows.find(question => question.id === editedQuestionId)) {
        console.log('Question found');


        const editedQuestion = {
          id: editedQuestionId,
          ...newQuestion,
        }

        const response = await editQuestion(editedQuestion);

        console.log('Question edited successfully:', response);

        return;
      }

      const response = await addQuestion(newQuestion);

      console.log('Question added successfully:', response);
    } catch (error) {
      console.error('Error adding question:', error);
    } finally {
      dispatch(setTitle(''));
      dispatch(setDefaultAnswers());
      dispatch(setCorrectAnswer(null));
      dispatch(setChosenCategory(null));
      dispatch(setChosenDifficulty(null));
    }

    console.log(newQuestion)
  }

  const showExample = () => {
    if (title !== '') {
      dispatch(setTitle(''));
      dispatch(setDefaultAnswers());
      dispatch(setCorrectAnswer(null));
      dispatch(setChosenCategory(null));
      dispatch(setChosenDifficulty(null));
      setIsExampleVisible(false);

      return;
    }

    dispatch(setTitle('Хто написав роман "Тигролови"?'));
    dispatch(addNewField());
    dispatch(setAnswers({ index: 0, value: 'Іван Франко' }));
    dispatch(setAnswers({ index: 1, value: 'Іван Багряний' }));
    dispatch(setAnswers({ index: 2, value: 'Тарас Шевченко' }));
    dispatch(setCorrectAnswer('Іван Багряний'));
    dispatch(setChosenCategory('Література'));
    dispatch(setChosenDifficulty('Нормально'));
    setIsExampleVisible(true);
  }
  
  return (
    <div className="form">
      <div
        className="form__example" 
        onClick={showExample}
      >
        <button
          className="form__example_button" 
        />
        <p className="form__example_text">
          {isExampleVisible
            ? 'Приховати приклад заповнення'
            : 'Показати приклад заповнення'
          }
        </p>
      </div>
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
              onChange={(e) => addAnswer(i, e.target.value)}
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
          className={cn('form__submit_button', {
            'form__submit_button--disabled': isExampleVisible
          })}
          disabled={isExampleVisible}
        >
          Додати питання
        </button>
      </form>
    </div>
  );
};

