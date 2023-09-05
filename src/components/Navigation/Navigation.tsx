import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './Navigation.scss';

export const Navigation = () => (
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
        >
        </NavLink>
      </li>
    </ul>
  </nav>
);
