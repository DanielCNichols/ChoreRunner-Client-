import React, { useState } from 'react';
import {
  Input,
  Required,
  Label,
  FormElement,
  Fieldset,
  Legend,
} from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import s from './RegistrationForm.module.css';

export default function RegistrationForm({ onRegistrationSuccess }) {
  const [inputs, setInputs] = useState({
    name: '',
    username: '',
    password: '',
    confirmPass: '',
  });

  const [error, setError] = useState({
    name: null,
    username: null,
    password: null,
    confirmPass: null,
    server: null,
  });

  function validateInputs() {
    let { name, username, password, confirmPass } = inputs;
    let errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }

    if (!username) {
      errors.username = 'Username is required';
    }

    if (username.length < 6) {
      errors.username = 'Please enter more than 6 characters';
    }

    if (username.length > 50) {
      errors.username = 'Your name must be less than 50 characters';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    if (password.startsWith(' ') || password.endsWith(' ')) {
      errors.password = 'Password must not begin with blank spaces';
    }

    if (!confirmPass || confirmPass !== password) {
      errors.password = 'Passwords must match';
    }

    return errors;
  }

  function handleChangeInputs(ev) {
    ev.persist();
    setInputs(inputs => ({
      ...inputs,
      [ev.target.name]: ev.target.value,
    }));
  }

  function resetErrors() {
    setError({
      name: null,
      username: null,
      password: null,
      confirmPass: null,
      server: null,
    });
  }

  async function handleRegister(ev) {
    try {
      ev.preventDefault();
      resetErrors();

      let errors = validateInputs();
      if (
        errors.name ||
        errors.username ||
        errors.password ||
        errors.confirmPass
      ) {
        return setError(errors);
      }

      await AuthApiService.postUser(inputs);
      onRegistrationSuccess();
    } catch (error) {
      setError({ server: error });
    }
  }

  return (
    <form
      className={s.registerForm}
      onSubmit={handleRegister}
      name="registration-form"
    >
      <Fieldset>
        <Legend>Sign Up</Legend>
        <FormElement className={s.formElement}>
          <Label htmlFor="registration-name-input">
            Enter your name
            <Required />
          </Label>

          {error.name && (
            <div role="alert" className={s.error}>
              <span>{error.name}</span>
            </div>
          )}
          <Input
            id="registration-name-input"
            name="name"
            value={inputs.name}
            onChange={handleChangeInputs}
          />
        </FormElement>
        <FormElement className={s.formElement}>
          <Label htmlFor="registration-username-input">
            Choose a username
            <Required />
          </Label>
          {error.username && (
            <div role="alert" className={s.error}>
              <span>{error.username}</span>
            </div>
          )}
          <Input
            id="registration-username-input"
            name="username"
            value={inputs.username}
            onChange={handleChangeInputs}
          />
        </FormElement>
        <FormElement className={s.formElement}>
          <Label htmlFor="registration-password-input">
            Choose a password
            <Required />
          </Label>
          {error.password && (
            <div role="alert" className={s.error}>
              <span>{error.password}</span>
            </div>
          )}
          <Input
            id="registration-password-input"
            name="password"
            type="password"
            value={inputs.password}
            onChange={handleChangeInputs}
          />
        </FormElement>

        <FormElement className={s.formElement}>
          <Label htmlFor="registration-password-input">
            Choose a password
            <Required />
          </Label>
          {error.confirmPass && (
            <div role="alert" className={s.error}>
              <span>{error.confirmPass}</span>
            </div>
          )}
          <Input
            id="registration-password-input"
            name="confirmPass"
            type="password"
            value={inputs.confirmPass}
            onChange={handleChangeInputs}
          />
        </FormElement>

        {error.server && (
          <div role="alert" className={s.error}>
            <span>{error.server}</span>
          </div>
        )}

        <button type="submit" className="arcadeButton">
          Sign up
        </button>
      </Fieldset>
    </form>
  );
}
