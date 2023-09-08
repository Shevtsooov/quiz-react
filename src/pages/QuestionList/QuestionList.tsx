import { useState } from 'react';
import { geography } from '../../data/geography';
import './QuestionList.scss';


export const QuestionList: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [query, setQuery] = useState('');
  const [showAnswers, setShowAnswers] = useState<string[]>([]);

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

  const filteredQuestions = geography.questions.filter(question => (
    question.title.toLowerCase().includes(query.toLowerCase())
  ))

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


        <input
          type="text"
          className='list__filter_category'
        />

        <input
          type="text"
          className='list__filter_difficulty'
        />
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
          {filteredQuestions.map(question => (
            <tr className='table__body_row'>
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
                    <li>
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
                    A
                  </button>
                  <button
                    className='table__body_buttons--general  table__body_buttons--edit'
                    // onClick={}
                  >
                    E
                  </button>
                  <button
                    className='table__body_buttons--general  table__body_buttons--remove'
                    // onClick={}
                  >
                    R
                  </button>
                </div>
                )}
              </td>
              {/* <td className='list__table_body_answers'>A</td> */}
              <td className='table__body_category'>{question.categoryName}</td>
              <td className='table__body_difficulty'>{question.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
}
