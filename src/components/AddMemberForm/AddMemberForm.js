import React, { useState } from 'react';
import ApiService from '../../services/api-service';
import { FormElement, Label, Input, Fieldset, Legend } from '../Form/Form';
import s from './AddMemberForm.module.css';

export default function AddMemberForm({
  id,
  handleAddMembers,
  toggleAddMember,
}) {
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

    if (!username.length > 50) {
      errors.username = 'Username must be less than 50 characters';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    if (password.startsWith(' ') || password.endsWith(' ')) {
      errors.password = 'Password must not begin with black spaces';
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

  async function handleSubmitMember(ev) {
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

      let newMember = { ...inputs, household_id: id };
      let added = await ApiService.addMember(newMember, id);

      handleAddMembers(added);
      toggleAddMember();
    } catch (error) {
      setError({ server: error });
    }
  }

  return (
    <form onSubmit={handleSubmitMember} className={s.addMemberForm}>
      <Fieldset>
        <Legend className="videoGameTitles">Add Member</Legend>
        <FormElement className={s.formElement}>
          <Label htmlFor="name">Name</Label>
          {error.name && (
            <div role="alert" className={s.error}>
              <span>{error.name}</span>
            </div>
          )}
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Elliott"
            onChange={handleChangeInputs}
            value={inputs.name}
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
            onChange={handleChangeInputs}
            value={inputs.username}
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
            type="password"
            id="password"
            name="password"
            onChange={handleChangeInputs}
            value={inputs.password}
          />
        </FormElement>

        <FormElement className={s.formElement}>
          <Label htmlFor="confirmPass">Member Password</Label>
          {error.confirmPass && (
            <div role="alert" className={s.error}>
              <span>{error.confirmPass}</span>
            </div>
          )}
          <Input
            type="password"
            name="confirmPass"
            onChange={handleChangeInputs}
            value={inputs.confirmPass}
          />
        </FormElement>

        <div className={s.formButtons}>
          <button
            className="arcadeButton"
            type="button"
            onClick={() => toggleAddMember()}
          >
            Cancel
          </button>
          <button type="submit" className="arcadeButton">
            Add Member
          </button>
        </div>
      </Fieldset>
    </form>
  );
}
