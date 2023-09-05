import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation/Navigation';
import './Header.scss';

export const Header: React.FC = () => {

  return (
    <div className="header">
      <Logo />
      
      <Navigation />
    </div>
  );
}
