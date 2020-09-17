import React, { useState } from 'react';
import s from './Member.module.css';
import EditMember from '../EditMember/EditMember';
import ProgressBar from '../ProgressBar/ProgressBar';
import { MdEdit, MdDelete } from 'react-icons/md';
import Modal from '../Modal/Modal';

export default function Member({ member, deleteMember, editMember, showEdit }) {
  const [editing, setEditing] = useState(false);

  const toggleEditMember = () => {
    setEditing(!editing);
  };

  return (
    <li className={s.memberDetails}>
      {editing && (
        <Modal titleText="Edit Member Form">
          <EditMember
            member={member}
            toggleEdit={toggleEditMember}
            editMember={editMember}
          />
        </Modal>
      )}
      <div className={s.memberEdit}>
        {showEdit && (
          <div className={s.memberEditButtonContainer}>
            <button
              onClick={() => deleteMember(member.id, member.household_id)}
            >
              <MdDelete />
            </button>
            <button onClick={() => toggleEditMember(member)}>
              <MdEdit />
            </button>
          </div>
        )}
        <span>{member.name}</span>
      </div>
      <span id={s.level}>{member.level_id}</span>
      <div className={s.progressBarContainer}>
        <ProgressBar progressPoints={member.pointsToNextLevel} />
      </div>
    </li>
  );
}
