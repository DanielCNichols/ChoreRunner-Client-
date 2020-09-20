import React, { useState, useContext } from 'react';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import s from './ParentLogin.module.css';
import { Input, FormElement, Label, Fieldset, Legend } from '../Form/Form';

export default function ParentLogin(props) {
  const context = useContext(UserContext);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState({
    username: null,
    password: null,
    server: null,
  });

  function onChangeHandle(ev) {
    ev.persist();
    setInputs(inputs => ({
      ...inputs,
      [ev.target.name]: ev.target.value,
    }));
  }

  const onLoginSuccess = () => {
    const { location, history } = props;
    const destination = (location.state || {}).from || '/parent-dashboard';
    history.push(destination);
  };

  function resetErrors() {
    setError({
      username: null,
      password: null,
      server: null,
    });
  }

  function validateInputs() {
    let { username, password } = inputs;
    let errors = {};

    if (!username) {
      errors.username = 'Username is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    return errors;
  }

  async function handleLoginSubmit(ev) {
    try {
      ev.preventDefault();
      resetErrors();

      let errors = validateInputs();

      if (Object.keys(errors).length) {
        return setError(errors);
      }

      let { authToken, type } = await AuthApiService.postLogin(inputs);
      context.processLogin(authToken, type);
      onLoginSuccess();
    } catch ({ error }) {
      setError({ server: error });
    }
  }

  return (
    <div className={s.container}>
      <form className={s.parentForm} onSubmit={handleLoginSubmit}>
        <div className={s.demo}>
          <h3>Demo:</h3>
          <p>username: margeincharge</p>
          <p>password: Password123!</p>
        </div>
        <Fieldset>
          <Legend>Parent Login</Legend>
          <FormElement className={s.formElement}>
            <Label htmlFor="username">Username</Label>
            {error.username && (
              <div role="alert" className={s.error}>
                <span>{error.username}</span>
              </div>
            )}
            <Input
              name="username"
              type="text"
              onChange={onChangeHandle}
              value={inputs.username}
            />
          </FormElement>

          <FormElement className={s.formElement}>
            <label htmlFor="password">Password</label>
            {error.password && (
              <div role="alert" className={s.error}>
                <span>{error.password}</span>
              </div>
            )}
            <Input
              name="password"
              type="password"
              onChange={onChangeHandle}
              value={inputs.password}
            />
          </FormElement>

          {error.server && (
            <div role="alert" className={s.error}>
              <span>{error.server}</span>
            </div>
          )}

          <button className="arcadeButton" type="submit">
            login
          </button>
        </Fieldset>
      </form>
    </div>
  );
}
