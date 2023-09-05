import './Logo.scss';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';

export const Logo: React.FC = () => {

  return (
    <div className="logo">
      <Link to="home">
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
