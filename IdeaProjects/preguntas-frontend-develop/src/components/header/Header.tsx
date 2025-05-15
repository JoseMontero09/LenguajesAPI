import './styles.css';
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className='header'>
      <div className='header-content'>
        <h2 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          TicoTickets
        </h2>
        <nav>
        </nav>
        <UserMenu />
      </div>
    </header>
  );
}

export default Header;
