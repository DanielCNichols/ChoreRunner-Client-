import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import s from './Header.module.css';

function NavBar(props) {
  const context = useContext(UserContext);

  const handleLogoutClick = () => {
    context.processLogout();
  };

  function renderLogoutLink() {
    return <p onClick={handleLogoutClick}>Logout</p>;
  }

  function renderLoginLinks() {
    return (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Sign Up</Link>
      </>
    );
  }

  return (
    <nav className={s.navBar}>
      <div className={s.logo}>
        <Link to="/">Chore Runner</Link>
      </div>

      <div className={s.navLinks}>
        {context.user.id ? renderLogoutLink() : renderLoginLinks()}
      </div>
    </nav>
  );
}

export default withRouter(NavBar);
