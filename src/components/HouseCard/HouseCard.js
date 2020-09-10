import React, { useState } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import s from './HouseCard.module.css';
import ApiService from '../../services/api-service';
import AddMembers from '../../components/AddMembers/AddMembers';
import { Link } from 'react-router-dom';
import {
  MdSave,
  MdEdit,
  MdDelete,
  MdPersonAdd,
  MdCancel,
  MdChevronRight,
} from 'react-icons/md';

export default function HouseCard({
  house,
  handleDelete,
  handleEdit,
  handleAddMembers,
}) {
  const [name, setName] = useState(house.name);
  const [addMember, setAddMember] = useState(false);
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

  const toggleAddMember = () => {
    setAddMember(!addMember);
  };

  const handleDeleteMember = async id => {
    console.log('do stuff');
  };

  return (
    <div className={s.houseCard}>
      {addMember ? (
        <AddMembers
          id={house.id}
          handleAddMembers={handleAddMembers}
          toggleAddMember={toggleAddMember}
        />
      ) : (
        <>
          <div className={s.cardHeader}>
            <header>
              {editing ? (
                <input value={name} onChange={ev => handleNameChange(ev)} />
              ) : (
                <h4 className="videoGameTitles">{house.name}</h4>
              )}
            </header>
            <div className={s.buttonContainer}>
              {editing ? (
                <>
                  <button onClick={() => setEditing(false)}>
                    <MdCancel />
                  </button>
                  <button onClick={() => handleSubmit()}>
                    <MdSave />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setAddMember(true)}>
                    <MdPersonAdd />
                  </button>
                  <button onClick={() => setEditing(true)}>
                    <MdEdit />
                  </button>
                  <button onClick={() => handleDeleteHousehold(house.id)}>
                    <MdDelete />
                  </button>
                </>
              )}
            </div>
          </div>

          {house.members.length ? (
            <div className={s.cardBody}>
              <p>Name</p>
              <p>Level</p>
              <p>Exp</p>

              <ul className={s.membersList}>
                {house.members.map(member => {
                  return (
                    <li key={member.id} className={s.memberDetails}>
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        {editing && (
                          <p
                            style={{
                              justifySelf: 'flex-end',
                              marginRight: '10px',
                              marginLeft: '-5px',
                            }}
                          >
                            X
                          </p>
                        )}
                        <p>{member.name}</p>
                      </div>
                      <p style={{ justifyContent: 'center' }}>
                        {member.level_id}
                      </p>
                      <div className={s.progressBarContainer}>
                        <ProgressBar
                          progressPercent={
                            (member.level_id * 10 - member.total_score - 10) *
                            10
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
          <div>
            <Link to={`/household/${house.id}`}>
              Manage Tasks
              <MdChevronRight />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
