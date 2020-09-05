import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import s from './Header.module.css';

export default function NavBar(props) {
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
        <Link to='/login'>Login</Link>
        <Link to='/register'>Sign Up</Link>
      </>
    );
  }

  return (
    <nav className={s.navBar}>
      <div className={s.logo}>
        <Link to='/'>Chore Runner</Link>
      </div>

      <div className={s.navLinks}>
        {context.user.id ? renderLogoutLink() : renderLoginLinks()}
      </div>
    </nav>
  );
}

// class Header extends Component {
//   static contextType = UserContext;

//   handleLogoutClick = () => {
//     this.context.processLogout();
//   };

//   renderLogoutLink() {
//     return (
//       <div className={s.loggedinInfo}>
//         <span>Hi Owner!</span>
//         <nav>
//           <Link onClick={this.handleLogoutClick} to='/'>
//             Logout
//           </Link>
//         </nav>
//       </div>
//     );
//   }

//   renderLoginLink() {
//     return (
//       <nav>
//         <Link style={{ textDecoration: 'none' }} to='/login'>
//           Login
//         </Link>{' '}
//         <Link style={{ textDecoration: 'none' }} to='/register'>
//           Sign up
//         </Link>
//       </nav>
//     );
//   }

//   render() {
//     let display = (
//       <h1>
//         {TokenService.hasAuthToken() ? (
//           <Link
//             to={
//               this.context.user.type === 'user'
//                 ? '/parent-dashboard'
//                 : '/member-dashboard'
//             }
//             style={{ textDecoration: 'none' }}
//           >
//             Chore Runner
//           </Link>
//         ) : (
//           <Link to='/' style={{ textDecoration: 'none' }}>
//             Chore Runner
//           </Link>
//         )}
//       </h1>
//     );

//     return (
//       <>
//         {display}
//         {TokenService.hasAuthToken()
//           ? this.renderLogoutLink()
//           : this.renderLoginLink()}
//       </>
//     );
//   }
// }
