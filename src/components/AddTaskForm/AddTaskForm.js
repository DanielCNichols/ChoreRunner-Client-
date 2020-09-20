import React, { useState } from 'react';
import {
  Input,
  FormElement,
  Label,
  Fieldset,
  Legend,
  Select,
} from '../Form/Form';
import ApiService from '../../services/api-service';
import s from './AddTaskForm.module.css';

export default function AddTask({ members, addTask, toggleAdd, householdId }) {
  const [inputs, setInputs] = useState({
    title: '',
    points: '',
    member_id: '',
    household_id: householdId,
  });

  const [error, setError] = useState({
    title: null,
    points: null,
    member: null,
    server: null,
  });

  function handleInputChange(ev) {
    ev.persist();
    setInputs(inputs => ({
      ...inputs,
      [ev.target.name]: ev.target.value,
    }));
  }

  function resetErrors() {
    setError({
      title: null,
      points: null,
      member: null,
      server: null,
    });
  }

  function validateInput() {
    let errors = {};
    let { title, points, member_id } = inputs;

    if (!title) {
      errors.title = 'Title is required';
    }

    if (!points) {
      errors.points = 'You must assign a point value';
    }

    if (!member_id) {
      errors.member = 'You must assign the task to a member';
    }

    return errors;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    resetErrors();
    try {
      let error = validateInput();

      if (error.title || error.member || error.points) {
        return setError(error);
      } else {
        let newTask = await ApiService.addTask(inputs);

        addTask(newTask);
        toggleAdd();
      }
    } catch (serverError) {
      setError({ ...error, server: serverError });
    }
  }

  return (
    <form className={s.addTaskForm} onSubmit={handleSubmit}>
      <Fieldset>
        <Legend>Assign Tasks</Legend>
        <FormElement className={s.formElement}>
          <Label htmlFor="taskName">Task Name</Label>
          {error.title && (
            <div role="alert" className={s.error}>
              <span>{error.title}</span>
            </div>
          )}
          <Input
            value={inputs.title}
            onChange={handleInputChange}
            placeholder="Clean Room"
            id="taskName"
            type="text"
            name="title"
          />
        </FormElement>

        <FormElement className={s.formElement}>
          <Label htmlFor="assignee">Assign to</Label>
          {error.member && (
            <div role="alert" className={s.error}>
              <span>{error.member}</span>
            </div>
          )}
          <Select
            value={inputs.member_id}
            onChange={handleInputChange}
            name="member_id"
            id="assignee"
            className="select-css"
          >
            <option value="">Please select a member</option>
            {members.map(member => {
              return (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              );
            })}
          </Select>
        </FormElement>

        <FormElement className={s.formElement}>
          <Label htmlFor="points">Points</Label>
          {error.points && (
            <div role="alert" className={s.error}>
              <span>{error.points}</span>
            </div>
          )}
          <Input
            value={inputs.points}
            onChange={handleInputChange}
            placeholder="2"
            type="number"
            min="1"
            max="100"
            id="points"
            name="points"
          />
        </FormElement>

        {error.server && (
          <div role="alert" className={s.error}>
            <p>{error.server.message}</p>
          </div>
        )}

        <div className={s.formButtons}>
          <button type="button" onClick={toggleAdd}>
            Cancel
          </button>
          <button type="submit">Assign Task</button>
        </div>
      </Fieldset>
    </form>
  );
}
