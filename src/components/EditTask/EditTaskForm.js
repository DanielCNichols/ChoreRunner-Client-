import React, { useState } from 'react';
import ApiService from '../../services/api-service';
import { Fieldset, Label, FormElement, Input, Legend } from '../Form/Form';
import s from './EditTaskForm.module.css';

export default function EditTaskForm({
  task: { id, title, points, household_id },
  handleUpdateTask,
  handleToggle,
  editTask,
}) {
  const [inputs, setInputs] = useState({
    id: id,
    title: title,
    points: points,
  });

  const [error, setError] = useState({
    title: null,
    points: null,
    server: null,
  });

  function handleInputChange(ev) {
    ev.persist();
    setInputs(inputs => ({
      ...inputs,
      [ev.target.name]: ev.target.value,
    }));
  }

  function validateInputs() {
    let { title, points } = inputs;
    let errors = {};
    if (!title) {
      errors.title = 'Task title is required';
    }

    if (!points) {
      errors.points = 'Please assign a point value';
    }

    if (points > 100 || points < 1) {
      errors.points = 'Point value must be between 1 and 100';
    }

    if (points % 1 !== 0) {
      errors.points = 'Point value must be a whole number';
    }

    return errors;
  }

  function resetErrors() {
    setError({
      title: null,
      points: null,
      server: null,
    });
  }

  async function handleEditSubmit(ev) {
    try {
      ev.preventDefault();
      resetErrors();

      let errors = validateInputs();

      if (Object.keys(errors).length) {
        return setError(errors);
      }

      let updated = await ApiService.updateTask(household_id, inputs);
      editTask(updated);
      handleToggle();
    } catch (error) {
      setError({ server: error });
    }
  }

  return (
    <form className={s.editTaskForm} onSubmit={handleEditSubmit}>
      <Fieldset>
        <Legend className="videoGameTitles">Edit Task</Legend>
        <FormElement className={s.formElement}>
          <Label htmlFor="title">Title</Label>
          {error.title && (
            <div className={s.error}>
              <span>{error.title}</span>
            </div>
          )}
          <Input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleInputChange}
          />
        </FormElement>
        <FormElement className={s.formElement}>
          <Label htmlFor="points">Point Value</Label>
          {error.points && (
            <div className={s.error}>
              <span>{error.points}</span>
            </div>
          )}
          <Input
            type="number"
            name="points"
            value={inputs.points}
            onChange={handleInputChange}
          />
        </FormElement>

        {error.server && (
          <div role="alert" className={s.error}>
            <span>{error.server}</span>
          </div>
        )}
        <div className={s.formButtons}>
          <button type="button" onClick={handleToggle}>
            Cancel
          </button>
          <button type="submit">Update Task</button>
        </div>
      </Fieldset>
    </form>
  );
}
