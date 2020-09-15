import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import s from './RegistrationRoute.module.css';

export default function RegistrationRoute(props) {
  RegistrationRoute.defaultProps = {
    history: {
      push: () => {},
    },
  };

  const handleRegistrationSuccess = () => {
    const { history } = props;
    history.push('/login');
  };

  return (
    <section className={s.registrationContainer}>
      <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
    </section>
  );
}
