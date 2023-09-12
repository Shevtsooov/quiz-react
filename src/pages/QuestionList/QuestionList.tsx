import { useState } from 'react';
import './QuestionList.scss';
import { Sorting } from '../../components/Sorting/Sorting';
import classNames from 'classnames';
import {
  useDeleteQuestionMutation,
  useGetAllQuestionsQuery,
} from '../../services/questions.service';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { Question } from '../../types/question';
import { setTitle } from '../../features/title.slice';
import { addNewField, setAnswers, setDefaultAnswers } from '../../features/answers.slice';
import { setCorrectAnswer } from '../../features/correctAnswer.slice';
import { setChosenCategory } from '../../features/chosenCategory.slice';
import { setChosenDifficulty } from '../../features/chosenDifficulty.slice';


export const QuestionList: React.FC = () => {
  const { data: questions, refetch } = useGetAllQuestionsQuery();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [query, setQuery] = useState('');
  const [showAnswers, setShowAnswers] = useState<string[]>([]);
  const [filterDifficulty, setFilterDifficulty] = useState('Складність')
  const navigate = useNavigate();

  const title = useAppSelector(state => state.title.value);
  const dispatch = useAppDispatch();

  const handleSearch = (search: string) => {
    setQuery(search);
  }

  const handleClearQuery = () => {
    setQuery('');
  }

  const handleAdd = (title: string) => {
    setCurrentQuestion(title)
  }

  const handleShowButtons = () => {
    setCurrentQuestion('');
  };

  const handleShowAnswers = (title: string) => {
    setShowAnswers((state) => {
      if (state.includes(title)) {
        return state.filter((t) => t !== title);
      } else {
        return [...state, title];
      }
    });
  }

  const filteredQuestions = questions?.filter(question => (
    question.title.toLowerCase().includes(query.toLowerCase().trim())
  ));

  const handleDifficulty = () => {
    if (filterDifficulty === 'Складність') {
      setFilterDifficulty('Легко');

      return;
    }
    if (filterDifficulty === 'Легко') {
      setFilterDifficulty('Нормально');

      return;
    }
    if (filterDifficulty === 'Нормально') {
      setFilterDifficulty('Складно');

      return;
    }

    setFilterDifficulty('Складність');
  }

  const handleDeleteQuestion = async (title: string) => {
    try {
      await deleteQuestion({ title });
      await refetch();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  }

  const handleEdit = (question: Question) => {

    if (title !== '') {
      dispatch(setTitle(''));
      dispatch(setDefaultAnswers());
      dispatch(setCorrectAnswer(null));
      dispatch(setChosenCategory(null));
      dispatch(setChosenDifficulty(null));
    }

    dispatch(setTitle(question.title));
    dispatch(setAnswers({ index: 0, value: question.answers[0] }));
    dispatch(setAnswers({ index: 1, value: question.answers[1] }));

    if (question.answers.length > 2) {
      dispatch(addNewField());
      dispatch(setAnswers({ index: 2, value: question.answers[2] }));
    }

    if (question.answers.length > 3) {
      dispatch(addNewField());
      dispatch(setAnswers({ index: 3, value: question.answers[3] }));
    }
   
    dispatch(setCorrectAnswer(question.answers[question.correctAnswer]));
    dispatch(setChosenCategory(question.categoryName));
    dispatch(setChosenDifficulty(question.difficulty));
  
    navigate('/new-question');
  }

  return (
    <div className='list'>
      <h1 className='list__title'>Список питань</h1>
      <p
        className='list__amount'
      >
        {`Кількість питань: 
        ${filteredQuestions
          ? filteredQuestions.length
          : 'обрахування...'}`}
      </p>
      <div className='list__filter'>
        <div className='list__filter_input'>
          <input
            type="text"
            className='list__filter_input--field'
            placeholder='Почніть шукати питання'
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {query && (
            <button 
              className='list__filter_input--clear'
              onClick={handleClearQuery}
            >
              X
            </button>
          )}
        </div>

        
        <Sorting />
          
        <button
          className={classNames('list__filter_difficulty', {
            'list__filter_difficulty--easy' : filterDifficulty === 'Легко',
            'list__filter_difficulty--medium' : filterDifficulty === 'Нормально',
            'list__filter_difficulty--hard' : filterDifficulty === 'Складно',
          })}
          onClick={handleDifficulty}
        >
          {filterDifficulty}
        </button>

      </div>

      <table className='table'>
        <thead className='table__head'>
          <tr>
            <td className='table__head_title'>Питання</td>
            <td className='table__head_category'>Категорія</td>
            <td className='table__head_difficulty'>Складність</td>
          </tr>
        </thead>
        <tbody className='table__body'>
          {filteredQuestions?.map(question => (
            <tr className='table__body_row' key={question.title}>
              <td
                className='table__body_title'
                onMouseEnter={() => handleAdd(question.title)}
                onMouseLeave={handleShowButtons}
              >
                <div>
                <p 
                  className='table__body_title_text'
                >
                  {question.title}
                </p>
                {showAnswers.includes(question.title) && (
                  <ul className='table__body_title_answers'>
                    {question.answers.map(answer => (
                    <li 
                      className='table__body_title_answers--item'
                      key={answer}
                    >
                      {answer}
                    </li>
                    ))}
                  </ul>
                )} 
                </div>
                
                
                {currentQuestion === question.title && (
                <div className='table__body_buttons'>
                  <button
                    className='table__body_buttons--general table__body_buttons--answers'
                    onClick={() => handleShowAnswers(question.title)}
                  >
                  </button>
                  <button
                    className='table__body_buttons--general  table__body_buttons--edit'
                    onClick={() => handleEdit(question)}
                  >
                  </button>
                  <button
                    className='table__body_buttons--general  table__body_buttons--remove'
                    onClick={() => handleDeleteQuestion(question.title)}
                  >
                  </button>
                </div>
                )}
              </td>
              {/* <td className='list__table_body_answers'>A</td> */}
              <td className='table__body_category'>{question.categoryName}</td>
              <td
                className={classNames('table__body_difficulty', {
                  'table__body_difficulty--easy': question.difficulty === 'Легко',
                  'table__body_difficulty--medium': question.difficulty === 'Нормально',
                  'table__body_difficulty--hard': question.difficulty === 'Складно'
                })}
              >
                {question.difficulty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
}
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

