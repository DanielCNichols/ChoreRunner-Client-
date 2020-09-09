import React, { useState } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import s from './HouseCard.module.css';
import ApiService from '../../services/api-service';

export default function HouseCard({ house, handleDelete, handleEdit }) {
  const [name, setName] = useState(house.name);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  const handleNameChange = e => {
    e.preventDefault();

    setName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!name.length) {
        throw new Error('Name is required');
      }

      let res = await ApiService.editHouseholdName(house.id, {
        name,
        id: house.id,
      });

      handleEdit(res);
      setEditing(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteHousehold = async id => {
    try {
      await ApiService.deleteHousehold(id);
      handleDelete(id);
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className={s.houseCard}>
      <div className={s.cardHeader}>
        <header>
          {editing ? (
            <input value={name} onChange={ev => handleNameChange(ev)} />
          ) : (
            <h4>{house.name}</h4>
          )}
        </header>
        <div className={s.buttonContainer}>
          {editing ? (
            <>
              <button onClick={() => setEditing(false)}>cancel</button>
              <button onClick={() => handleSubmit()}>save</button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={() => handleDeleteHousehold(house.id)}>
                Delete
              </button>
              <button>More</button>
            </>
          )}
        </div>
      </div>

      {/* This will be display: grid */}

      {house.members.length ? (
        <div className={s.cardBody}>
          <p>Name</p>
          <p>Level</p>
          <p>Exp</p>

          <ul className={s.membersList}>
            {house.members.map(member => {
              return (
                <li key={member.id} className={s.memberDetails}>
                  <p>{member.name}</p>
                  <p>{member.level_id}</p>
                  <div className={s.progressBarContainer}>
                    <ProgressBar
                      progressPercent={
                        (member.level_id * 10 - member.total_score - 10) * 10
                      }
                      progressPoints={
                        member.level_id * 10 - member.total_score - 10
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>You have not added any members to this household</p>
      )}
    </div>
  );
}
