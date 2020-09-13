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
        <Modal>
          <EditMember
            member={member}
            toggleEdit={toggleEditMember}
            editMember={editMember}
          />
        </Modal>
      )}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {showEdit && (
          <div className={s.memberEditButtonContainer}>
            <MdDelete
              onClick={() => deleteMember(member.id, member.household_id)}
            />
            <MdEdit onClick={() => toggleEditMember(member)} />
          </div>
        )}

        <p style={{ textAlign: 'left', width: '100%' }}>{member.name}</p>
      </div>
      <p style={{ justifyContent: 'center' }}>{member.level_id}</p>
      <div className={s.progressBarContainer}>
        <ProgressBar
          progressPercent={
            (member.level_id * 10 - member.total_score - 10) * 10
          }
          progressPoints={member.level_id * 10 - member.total_score - 10}
        />
      </div>
    </li>
  );
}
