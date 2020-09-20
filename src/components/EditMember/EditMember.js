import React, { useState } from 'react';
import ApiService from '../../services/api-service';
import s from './EditMemberForm.module.css';
import { Fieldset, Input, Label, FormElement, Legend } from '../Form/Form';

export default function EditMember({
  editMember,
  toggleEdit,
  member: { id, household_id, name, username, password },
}) {
  const [inputs, setInputs] = useState({
    name: name,
    username: username,
    password: '',
    confirmPass: '',
  });

  const [passwordTouched, setPasswordTouched] = useState(false);

  const [error, setError] = useState({
    name: null,
    username: null,
    password: null,
    confirmPass: null,
    server: null,
  });

  function handleInputChange(ev) {
    ev.persist();
    setInputs(input => ({
      ...inputs,
      [ev.target.name]: ev.target.value,
    }));
  }

  function toggleTouched() {
    setPasswordTouched(true);
  }

  function validateInputs() {
    let { name, username, password, confirmPass } = inputs;
    let errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }

    if (!username) {
      errors.username = 'Username is required';
    }

    if (passwordTouched) {
      if (!password) {
        errors.password = 'Password is required';
      }

      if (!confirmPass || confirmPass !== password) {
        errors.confirmPass = 'Passwords must match';
      }
    }

    return errors;
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
  async function handleEditSubmit(ev) {
    try {
      resetErrors();
      ev.preventDefault();
      let errors = validateInputs();

      if (Object.keys(errors).length) {
        return setError(errors);
      }

      let updatedMember = {
        id,
        household_id,
        name: inputs.name,
        username: inputs.username,
        password: passwordTouched ? inputs.password : password,
      };

      let update = await ApiService.editMember(updatedMember);

      editMember(update);
      toggleEdit();
    } catch ({ error }) {
      setError({ server: error });
    }
  }

  return (
    <form onSubmit={handleEditSubmit} className={s.editMemberForm}>
      <Fieldset>
        <Legend className="videoGameTitles">Edit Member</Legend>
        <FormElement className={s.formElement}>
          <Label htmlFor="name">Name</Label>
          {error.name && (
            <div role="alert" className={s.error}>
              <span>{error.name}</span>
            </div>
          )}
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Elliott"
            value={inputs.name}
            onChange={handleInputChange}
          />
        </FormElement>

        <FormElement className={s.formElement}>
          <Label htmlFor="username">Member Username</Label>
          {error.username && (
            <div role="alert" className={s.error}>
              <span>{error.username}</span>
            </div>
          )}
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="elliot123"
            value={inputs.username}
            onChange={handleInputChange}
          />
        </FormElement>

        <FormElement className={s.formElement}>
          <Label htmlFor="password">Member Password</Label>
          {error.password && (
            <div role="alert" className={s.error}>
              <span>{error.password}</span>
            </div>
          )}
          <Input
            id="password"
            type="password"
            name="password"
            onFocus={toggleTouched}
            onChange={handleInputChange}
          />
        </FormElement>
        <FormElement className={s.formElement}>
          <Label htmlFor="confirmPass">Confirm Password</Label>
          {error.confirmPass && (
            <div role="alert" className={s.error}>
              <span>{error.confirmPass}</span>
            </div>
          )}
          <Input
            id="confirmPass"
            type="password"
            name="confirmPass"
            onChange={handleInputChange}
          />
        </FormElement>
        {error.server && (
          <div role="alert" className={s.error}>
            <span>{error.server}</span>
          </div>
        )}

        <div className={s.formButtons}>
          <button className="arcadeButton" type="button" onClick={toggleEdit}>
            Cancel
          </button>
          <button className="arcadeButton" type="submit">
            Submit
          </button>
        </div>
      </Fieldset>
    </form>
  );
}
