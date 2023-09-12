import { useState } from 'react';
import './QuestionList.scss';
import { Sorting } from '../../components/Sorting/Sorting';
import classNames from 'classnames';
import {
  useDeleteQuestionMutation,
  useGetAllQuestionsQuery,
} from '../../services/questions.service';


export const QuestionList: React.FC = () => {
  const { data: questions, refetch } = useGetAllQuestionsQuery();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [query, setQuery] = useState('');
  const [showAnswers, setShowAnswers] = useState<string[]>([]);
  const [filterDifficulty, setFilterDifficulty] = useState('Складність')

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
      // After successful deletion, refetch the list of questions to update the UI
      await refetch();
    } catch (error) {
      // Handle any errors that occur during deletion
      console.error('Error deleting question:', error);
    }
  }

  return (
    <div className='list'>
      <h1 className='list__title'>Список питань</h1>

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
                    <li className='table__body_title_answers--item'>
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
                    // onClick={}
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
