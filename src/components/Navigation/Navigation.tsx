import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './Navigation.scss';
import { useAppDispatch } from '../../app/store';
import { setDefaultAnswers } from '../../features/answers.slice';
import { setTitle } from '../../features/title.slice';
import { setChosenCategory } from '../../features/chosenCategory.slice';
import { setChosenDifficulty } from '../../features/chosenDifficulty.slice';
import { setCorrectAnswer } from '../../features/correctAnswer.slice';

export const Navigation = () => {
  const dispatch = useAppDispatch();
  
  const clearForm = () => {
      dispatch(setTitle(''));
      dispatch(setDefaultAnswers());
      dispatch(setCorrectAnswer(null));
      dispatch(setChosenCategory(null));
      dispatch(setChosenDifficulty(null));
  }

  return (
    <nav className="nav">
    <ul className="nav__list">
      <li className="nav__item ">
        <NavLink
          className={({ isActive }) => cn(
            'nav__link', 'nav__link-list', { 'is-active': isActive },
          )}
          to="questions"
        >
        </NavLink>
      </li>

      <li className="nav__item">
        <NavLink
          className={({ isActive }) => cn(
            'nav__link', 'nav__link-plus', { 'is-active': isActive },
          )}
          to="new-question"
          onClick={clearForm}
        >
        </NavLink>
      </li>
    </ul>
  </nav>
  )
}
