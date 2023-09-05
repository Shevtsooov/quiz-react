import { useState } from "react";
import cn from "classnames";
import './AddNewQuestion.scss';

export const AddNewQuestion = () => {
  const [title, setTitle] = useState<string>('');
  const [answers, setAnswers] = useState(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const titleLimit = 120;
  const answerLimit = 60;
  
  const addTitle = (title: string) => {
    if (title.length === titleLimit + 1) {
      console.log('limit');
      return;
    }
    setTitle(title);
  };

  const clearTitle = () => {
    setTitle('');
  }

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
  }

  const addAnswer = (e: string, i: number) => {
    if (e.length === answerLimit) {
      console.log('limit');
      return;
    }
    setAnswers((state) => {
      const updatedAnswers = [...state];
      updatedAnswers[i] = e;
      return updatedAnswers;
    });
  }

  console.log(answers)
  return (
    <div className="form">
    <form>
      <div className='form__title'>
        <textarea
          className='form__title_textarea'
          maxLength={titleLimit}
          value={title}
          onChange={(e) => addTitle(e.target.value)}
        />
        <span className='form__title_limit'>{`${title.length}/${titleLimit}`}</span>
        <button
          className='form__title_clear'
          onClick={clearTitle}
        >X</button>
      </div>
      {answers.map((el, i) => (
        <div key={i} className='form__answers'>
          <input
            type="text"
            className='form__answer'
            style={{width: `${answers[i].length * 2 + 0}ch`}}
            maxLength={answerLimit}
            value={answers[i]}
            onChange={(e) => addAnswer(e.target.value, i)}
          />
          <button
            className="form__answers--correct"
          />

          {i < (answers.length - 1)
            ? (
              <button 
                onClick={() => addNewInput('-', i)}
                className={cn('form__answer_button form__answer_button-minus', {
                  'form__answer_button-minus--hidden': answers.length === 2
                })}
              >
                -
              </button>
            )
            : (
              <button 
              onClick={() => addNewInput('+', i)}
              className='form__answer_button form__answer_button-plus'
            >
              +
            </button>
            )}
        </div>
      ))}
  
  
    </form>
  </div>
  );
};

