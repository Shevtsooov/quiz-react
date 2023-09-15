import './Logo.scss';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import { useAppDispatch } from '../../app/store';
import { resetPage } from '../../features/page.slice';
import { resetSteps } from '../../features/step.slice';
import { resetGameCategoriess } from '../../features/gameCategories.slice';
import { resetGameQuantity } from '../../features/gameQuantity.slice ';
import { resetGameCorrectAnswers } from '../../features/gameCorrectAnswers.slice ';

export const Logo: React.FC = () => {
  const dispatch = useAppDispatch();

  const resetGame = () => {
    dispatch(resetSteps());
    dispatch(resetPage());
    dispatch(resetGameCategoriess());
    dispatch(resetGameQuantity());
    dispatch(resetGameCorrectAnswers());
  }

  return (
    <div className="logo">
      <Link
        to="home"
        onClick={resetGame}
      >
        <img
          className="logo__img"
          src={`${logo}`}
          alt="Quiz logo"
        >
        </img>
      </Link>
    </div>
  );
}

