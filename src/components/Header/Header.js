import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import s from './Header.module.css';

function NavBar(props) {
  const context = useContext(UserContext);

  const handleLogoutClick = () => {
    context.processLogout();
    props.history.push('/');
  };

  function LogoutLinks() {
    return (
      <p className={s.logout} onClick={handleLogoutClick}>
        Logout
      </p>
    );
  }

  function LoginLinks() {
    return (
      <div className={s.loginLinks}>
        <Link to="/login">Login</Link>
        <Link to="/register">Sign Up</Link>
      </div>
    );
  }

  return (
    <nav className={s.navBar}>
      <div className={s.logo}>
        <Link to="/">Chore Runner</Link>
      </div>

      <div className={s.navLinks}>
        {context.user.id ? <LogoutLinks /> : <LoginLinks />}
      </div>
    </nav>
  );
}

export default withRouter(NavBar);
