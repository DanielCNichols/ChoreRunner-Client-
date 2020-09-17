import React, { useState } from 'react';
import s from './HouseCard.module.css';
import ApiService from '../../services/api-service';
import Modal from '../Modal/Modal';
import AddMembers from '../AddMembers/AddMemberForm';
import { Link } from 'react-router-dom';
import Member from '../Member/Member';

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
  handleEditMember,
  deleteMember,
}) {
  const [name, setName] = useState(house.name);
  const [addMember, setAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState(false);
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

  const handleDeleteMember = async (memberId, householdId) => {
    try {
      await ApiService.deleteMember(memberId);

      deleteMember(memberId, householdId);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className={s.houseCard}>
      {addMember && (
        <Modal titleText="Add Member Form">
          <AddMembers
            id={house.id}
            handleAddMembers={handleAddMembers}
            toggleAddMember={toggleAddMember}
          />
        </Modal>
      )}
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
              <div className={s.editButtons}>
                <button onClick={() => setEditing(false)}>
                  <MdCancel />
                </button>
                <button onClick={() => handleSubmit()}>
                  <MdSave />
                </button>
              </div>
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
                  <Member
                    key={member.id}
                    showEdit={editing}
                    member={member}
                    deleteMember={handleDeleteMember}
                    editMember={handleEditMember}
                  />
                );
              })}
            </ul>
          </div>
        ) : (
          <p>You have not added any members to this household</p>
        )}
        {!!house.members.length && (
          <div className={s.detailsLink}>
            <Link to={`/household/${house.id}`}>
              Manage Tasks
              <MdChevronRight />
            </Link>
          </div>
        )}
      </>
    </div>
  );
}
