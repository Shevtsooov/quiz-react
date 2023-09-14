import { useEffect, useState } from 'react';
import './QuestionList.scss';
import { Sorting } from '../../components/Sorting/Sorting';
import classNames from 'classnames';
import {
  useDeleteQuestionMutation,
  useFindAndCountQuestionsQuery,
} from '../../services/questions.service';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { Question } from '../../types/question';
import { setTitle } from '../../features/title.slice';
import { addNewField, setAnswers, setDefaultAnswers } from '../../features/answers.slice';
import { setCorrectAnswer } from '../../features/correctAnswer.slice';
import { setChosenCategory } from '../../features/chosenCategory.slice';
import { setChosenDifficulty } from '../../features/chosenDifficulty.slice';
import { setFilteredDifficulty } from '../../features/filteredDifficulty.slice';
import { setQuery } from '../../features/query.slice';
import { Pagination } from '../../components/Pagination/Pagination';
import { setEditedQuestionId } from '../../features/editedQuestionId.slice';
import { setPassword } from '../../features/password.slice';


export const QuestionList: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [showAnswers, setShowAnswers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState('')
  const navigate = useNavigate();
  
  const title = useAppSelector(state => state.title.value);
  const query = useAppSelector(state => state.query.value);
  const filteredDifficulty = useAppSelector(state => state.filteredDifficulty.value);
  const filteredCategory = useAppSelector(state => state.filteredCategory.value);

  const password = useAppSelector(state => state.password.value);

  const dispatch = useAppDispatch();
  
  const [deleteQuestion] = useDeleteQuestionMutation();

  const perPage = 20;
  const pass = 'Quiz2023';

  const { data: questions, refetch } = useFindAndCountQuestionsQuery({
    limit: perPage,
    offset: (currentPage - 1) * perPage,
    query,
    categoryName: filteredCategory === 'Всі категорії'
                  ? 'all'
                  : filteredCategory,
    difficulty:  filteredDifficulty === 'Складність'
                  ? 'all'
                  : filteredDifficulty
  });

  useEffect(() => {
      refetch();
  }, [questions, refetch]);

  const handleSearch = (search: string) => {
    dispatch(setQuery(search));
  }

  const handleClearQuery = () => {
    dispatch(setQuery(''));
    setShowAnswers([]);
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

  const handleDifficulty = () => {
    refetch();

    if (filteredDifficulty === 'Складність') {
      dispatch(setFilteredDifficulty('Легко'));
      setCurrentPage(1);
      return;
    }
    if (filteredDifficulty === 'Легко') {
      dispatch(setFilteredDifficulty('Нормально'));
      setCurrentPage(1);

      return;
    }
    if (filteredDifficulty === 'Нормально') {
      dispatch(setFilteredDifficulty('Складно'));
      setCurrentPage(1);

      return;
    }

    dispatch(setFilteredDifficulty('Складність'));
  }

  const handleShowModal = (title: string) => {
    setShowModal(true);
    setQuestionToDelete(title);
  }
  
  const handleDeleteQuestion = async () => {
    try {
      await deleteQuestion({ title: questionToDelete });
      await refetch();
    } catch (error) {
      console.error('Error deleting question:', error);
    }

    setShowModal(false);
  }

  const handleEdit = (question: Question) => {
    if (title !== '') {
      dispatch(setEditedQuestionId(null))
      dispatch(setTitle(''));
      dispatch(setDefaultAnswers());
      dispatch(setCorrectAnswer(null));
      dispatch(setChosenCategory(null));
      dispatch(setChosenDifficulty(null));
    }

    dispatch(setEditedQuestionId(question.id))
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

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='list'>
      {showModal && (
        <div className='modal_window'>
          <button
            className='modal_window__close'
            onClick={() => setShowModal(false)}
          />
          <p className='modal_window__notice'>
            Ви дійсно бажаєте видалити це питання?
          </p>
          <input 
            type="password"
            placeholder='Введіть пароль адміністратора'
            className='modal_window__password'
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
          <button
            className={classNames('modal_window__remove', {
              'modal_window__remove--disabled': pass !== password
            })}
            disabled={pass !== password}
            onClick={handleDeleteQuestion}
          >
            видалити
          </button>
        </div>
      )} 

      <h1 className='list__title'>Список питань</h1>
      <p
        className='list__amount'
      >
        {`Кількість питань: ${
          questions?.rows
            ? questions?.count
            : 'обрахування...'
          }`}
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

        
        <Sorting 
          setCurrentPage={setCurrentPage}
        />
          
        <button
          className={classNames('list__filter_difficulty', {
            'list__filter_difficulty--easy' : filteredDifficulty === 'Легко',
            'list__filter_difficulty--medium' : filteredDifficulty === 'Нормально',
            'list__filter_difficulty--hard' : filteredDifficulty === 'Складно',
          })}
          onClick={handleDifficulty}
        >
          {filteredDifficulty}
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
          {questions?.rows.map(question => (
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
                    onClick={() => handleShowModal(question.title)}
                  >
                  </button>
                </div>
                )}
              </td>
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
      {questions?.rows &&  questions.count > 20 && (
        <Pagination
          total={questions?.count}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
      
    </div>
  );
}

