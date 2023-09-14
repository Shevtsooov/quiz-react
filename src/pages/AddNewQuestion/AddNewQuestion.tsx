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

export const AddNewQuestion = () => {

  // REDUX TOOLKIT STATE

  const editedQuestionId = useAppSelector((state) => state.editedQuestionId.value);
  const title = useAppSelector((state) => state.title.value);
  const answers = useAppSelector((state) => state.answers.value);
  const correctAnswer = useAppSelector((state) => state.correctAnswer.value);
  const chosenCategory = useAppSelector((state) => state.chosenCategory.value);
  const chosenDifficulty = useAppSelector((state) => state.chosenDifficulty.value);

  const dispatch = useAppDispatch();

  // LOCAL STATE

  const [isExampleVisible, setIsExampleVisible] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isAnswerError, setIsAnswerError] = useState(false);
  const [isCategoryError, setIsCategoryError] = useState(false);
  const [isDifficultyError, setIsDifficultyError] = useState(false);
  
  const [showModal, setShowModal] = useState(false);

  // RTK QUERY

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: questions, refetch } = useGetAllQuestionsQuery();

  const [addQuestion, {
    // isLoading: isAdding,
    isSuccess: isAdded,
    isError: isErrorAdding,
  }] = useAddQuestionMutation();

  const [editQuestion, {
    // isLoading: isUpdating,
    isSuccess: isUpdated,
    isError: isErrorUpdating,
  }] = useEditQuestionMutation();

  // SOME LIMITS AND DIFFICULTIES

  const difficultyLevels = ['Легко', 'Нормально', 'Складно']
  const titleLimit = 120;
  const answerLimit = 60;
  const timeout = 2000;
  
  // HANDLERS:

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
      setIsAnswerError(true);
  
      setTimeout(() => {
        setIsAnswerError(false);
      }, timeout);

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

  //FORM SUBMISSION

  const anyError = title.length < 10
  || answers.includes('')
  || correctAnswer === null
  || !chosenCategory
  || !chosenDifficulty;

  const shouldWeEdit = editedQuestionId
  && questions?.rows.find(question => question.id === editedQuestionId);

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();
    
    if (anyError) {
      if (title.length < 10) {
        setIsTitleError(true);
  
        setTimeout(() => {
          setIsTitleError(false);
        }, timeout);
      }
  
      if (answers.includes('') || correctAnswer === null) {
        setIsAnswerError(true);
  
        setTimeout(() => {
          setIsAnswerError(false);
        }, timeout);
      };
  
      if (!chosenCategory) {
        setIsCategoryError(true);
  
        setTimeout(() => {
          setIsCategoryError(false);
        }, timeout);
      };
  
      if (!chosenDifficulty) {
        setIsDifficultyError(true);
  
        setTimeout(() => {
          setIsDifficultyError(false);
        }, timeout);
      };

      return;
    }

    setShowModal(true);

    const newQuestion = {
      title,
      answers,
      correctAnswer: answers.indexOf(correctAnswer),
      category: getKeyByValue(possibleCategories, chosenCategory),
      categoryName: chosenCategory,
      difficulty: chosenDifficulty
    }

    try {
      if (shouldWeEdit) {

        const editedQuestion = {
          id: editedQuestionId,
          ...newQuestion,
        }

        const response = await editQuestion(editedQuestion);

        if (response) {
          console.log('Question edited successfully:', response);
        }
      } else {
        const response = await addQuestion(newQuestion);
        
        if (response) {
          console.log('Question added successfully:', response);
        } 
      }
    } catch (error) {
      console.error('Error adding question:', error);
      console.log(isErrorAdding, isErrorUpdating);
      
      return;
    } finally {
      dispatch(setTitle(''));
      dispatch(setDefaultAnswers());
      dispatch(setCorrectAnswer(null));
      dispatch(setChosenCategory(null));
      dispatch(setChosenDifficulty(null));

      setTimeout(() => {
        setShowModal(false);
      }, timeout)
    }
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
      {showModal && (
        <div className="modal">
          <div className={cn('modal_icon', {
            'modal_icon--success': isAdded || isUpdated,
            'modal_icon--error': isErrorAdding || isErrorUpdating
          })}
          >
          </div>
            {isAdded && (
            <p 
              className="modal_text modal_text--add_success"
            >
              Питання успішно додано
            </p>)}

            {isUpdated && (
            <p 
              className="modal_text modal_text--update_success"
            >
              Питання успішно оновлено
            </p>)}

            {isErrorAdding && (<p 
              className="modal_text modal_text--add_error"
            >
              На жаль, питання не було додано
            </p>)}
            
            {isErrorUpdating && (<p 
              className="modal_text modal_text--update_error"
            >
              На жаль, питання не було оновлено
            </p>)}
        </div>
      )} 

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
            className={cn('form__title_textarea', {
              'form__title_textarea--error': isTitleError
            })}
            spellCheck='false'
            maxLength={titleLimit}
            disabled={isExampleVisible}
            placeholder="Напишіть своє питання"
            value={title}
            onChange={(e) => addTitle(e.target.value)}
          />

          <span
            className={cn('form__title_error', {
              'form__title_error--visible': isTitleError
            })}
          >
            {`Закоротке питання. Введіть мінімум 10 символів.`}
          </span>

          <span
            className='form__title_limit'
          >
            {`${title.length}/${titleLimit}`}
          </span>

          <button
            type="button"
            className={cn('form__title_clear', {
              'form__title_clear--hidden': title === ''
            })}
            disabled={isExampleVisible}
            onClick={clearTitle}
          >X</button>

        </div>

        <p
          className={cn('form__label', {
            'form__label--error': isAnswerError
          })}
        >
          Вкажіть можливі та вірну відповіді:
        </p>
        {answers.map((_, i) => (
          <div key={i} className='form__answers'>
            <input
              type="text"
              className={cn('form__answer', {
                'form__answer--error': answers[i] === '' && isAnswerError
              })}
              style={{width: `${answers[i].length * 2 + 0}ch`}}
              placeholder={`${i + 1} варіант`}
              disabled={isExampleVisible}
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
              disabled={isExampleVisible}
              onClick={() => addCorrect(answers[i])}
            />

            <button
              type="button"
              disabled={isExampleVisible}
              onClick={() => clearAnswer(i)}
              className={cn('form__answer_button form__answer_button-clear', {
                'form__answer_button-clear--hidden': answers[i] === ''
              })}
            >X</button>

            <button
              type="button"
              disabled={isExampleVisible}
              onClick={() => addNewInput('-', i)}
              className={cn('form__answer_button form__answer_button-minus', {
                'form__answer_button-minus--hidden': answers.length === 2
              })}
            >-</button>

            <button 
              type="button"
              disabled={isExampleVisible}
              onClick={() => addNewInput('+', i)}
              className={cn('form__answer_button form__answer_button-plus', {
                'form__answer_button-plus--hidden': answers.length === 4 || i + 1 !== answers.length
              })}
            >+</button>
          </div>
        ))}
        
        <p 
          className={cn('form__label', {
          'form__label--error': isCategoryError
          })}
        >
          Оберіть відповідну категорію:
        </p>
        <div className="form_categories">
          {categoryNames.map(category => (
            <button
              type="button"
              disabled={isExampleVisible}
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

        <p 
          className={cn('form__label', {
          'form__label--error': isDifficultyError
          })}
        >
          Визначте складність питання:
        </p>
        <div className="form_categories">
          {difficultyLevels.map(difficulty => (
            <button
              type="button"
              disabled={isExampleVisible}
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
            'form__submit_button--disabled': isExampleVisible || isDifficultyError
          })}
          disabled={isExampleVisible || isDifficultyError}
        >
          {shouldWeEdit
            ? 'Редагувати питання'
            : 'Додати питання'}
        </button>
      </form>
    </div>
  );
};

