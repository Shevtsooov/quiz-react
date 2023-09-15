import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './Navigation.scss';
import { useAppDispatch } from '../../app/store';
import { setDefaultAnswers } from '../../features/answers.slice';
import { setTitle } from '../../features/title.slice';
import { setChosenCategory } from '../../features/chosenCategory.slice';
import { setChosenDifficulty } from '../../features/chosenDifficulty.slice';
import { setCorrectAnswer } from '../../features/correctAnswer.slice';
import { setQuery } from '../../features/query.slice';
import { setFilteredCategory } from '../../features/filteredCategory.slice';
import { setFilteredDifficulty } from '../../features/filteredDifficulty.slice';
import { setEditedQuestionId } from '../../features/editedQuestionId.slice';

export const Navigation = () => {
  const dispatch = useAppDispatch();
  
  const clearForm = () => {
      dispatch(setTitle(''));
      dispatch(setDefaultAnswers());
      dispatch(setCorrectAnswer(null));
      dispatch(setChosenCategory(null));
      dispatch(setChosenDifficulty(null));
      dispatch(setEditedQuestionId(null));
  }

  const refreshList = () => {
      dispatch(setQuery(''));
      dispatch(setFilteredCategory('Всі категорії'));
      dispatch(setFilteredDifficulty('Складність'));
      dispatch(setEditedQuestionId(null));
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
          onClick={refreshList}
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
