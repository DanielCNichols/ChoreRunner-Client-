import React, { useState } from 'react';
import s from './AddHouseHoldForm.module.css';
import {
  Input,
  FormElement,
  Fieldset,
  Label,
  Legend,
} from '../../components/Form/Form';
import ApiService from '../../services/api-service';

export default function AddHouseHoldForm({ handleAdd, toggleAdd }) {
  const [groupName, setGroupName] = useState('');

  const [confirm, setConfirm] = useState('');

  const [error, setError] = useState({
    groupName: null,
    server: null,
  });

  const handleInputChange = ev => {
    ev.persist();
    setGroupName(ev.target.value);
  };

  const handleHouseholdSubmit = async ev => {
    try {
      ev.preventDefault();
      setError({ groupName: null });

      if (!groupName) {
        return setError({ groupName: 'Group name is required' });
      }

      let added = await ApiService.postHousehold(groupName);

      handleAdd(added);
      toggleAdd();
    } catch (error) {
      setError({ error: error });
    }
  };

  return (
    <form className={s.addHouseholdForm} onSubmit={handleHouseholdSubmit}>
      <Fieldset>
        <Legend>Add a Group</Legend>
        <FormElement>
          <Label htmlFor="groupName">Group Name</Label>
          {error.groupName && (
            <div className={s.error}>
              <span>{error.groupName}</span>
            </div>
          )}
          <Input
            onChange={handleInputChange}
            name="groupName"
            type="text"
            value={groupName}
          />
        </FormElement>

        {error.server && (
          <div className={s.error}>
            <span>{error.server}</span>
          </div>
        )}
        <div className={s.formButtons}>
          <button className="arcadeButton" type="button" onClick={toggleAdd}>
            Cancel
          </button>
          <button className="arcadeButton" type="submit">
            Create
          </button>
        </div>
      </Fieldset>
    </form>
  );
}
