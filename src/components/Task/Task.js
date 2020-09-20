import React, { useState } from 'react';
import ApiService from '../../services/api-service';
import EditTaskForm from '../EditTask/EditTaskForm';
import Modal from '../Modal/Modal';
import { MdEdit, MdDelete } from 'react-icons/md';
import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';

import s from './Task.module.css';

export default function Task({
  task,
  task: { id, household_id, member_id, points, title, status },
  editTask,
  deleteTask,
  approveTask,
  rejectTask,
}) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteTask = async () => {
    try {
      await ApiService.deleteTask(id);
      deleteTask(id, member_id);
    } catch (error) {
      setError(error);
    }
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const handleApproveTask = async () => {
    try {
      let {
        total_score,
        toNextLevel,
        level_id,
      } = await ApiService.parentApproveTask(task);
      approveTask(total_score, toNextLevel, level_id, id, member_id);
    } catch (error) {
      setError(error);
    }
  };

  const handleRejectTask = async () => {
    try {
      await ApiService.parentRejectTask(id);
      rejectTask(task);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <li className={s.taskItem}>
      {editing && (
        <Modal titleText="Edit task form">
          <EditTaskForm
            editTask={editTask}
            handleToggle={toggleEdit}
            task={task}
          />
        </Modal>
      )}

      <p>{title}</p>
      <p>Points: {points}</p>

      <div className={s.taskControls}>
        {status !== 'completed' && (
          <>
            <button onClick={() => handleDeleteTask()}>
              <MdDelete />
            </button>
            <button onClick={() => toggleEdit()}>
              <MdEdit />
            </button>
          </>
        )}

        {status !== 'assigned' && (
          <>
            <button onClick={() => handleApproveTask()}>
              <IoMdThumbsUp />
            </button>
            <button onClick={() => handleRejectTask()}>
              <IoMdThumbsDown />
            </button>
          </>
        )}
      </div>

      {error && (
        <div className={s.fadeIn}>
          <p>{error.message}</p>
        </div>
      )}
    </li>
  );
}
