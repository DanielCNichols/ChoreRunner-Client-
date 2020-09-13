import React, { Component, useState } from 'react';
import ApiService from '../../services/api-service';
import EditTask from '../EditTask/EditTask';
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
      await ApiService.deleteTask(household_id, id);
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
      await ApiService.parentUpdateTaskStatus(
        id,
        household_id,
        'approved',
        points,
        member_id
      );
      approveTask(points, member_id, id);
    } catch (error) {
      setError(error);
    }
  };

  const handleRejectTask = async () => {
    try {
      await ApiService.parentUpdateTaskStatus(
        id,
        household_id,
        'assigned',
        points,
        member_id
      );
      rejectTask(points, member_id, id);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <li className={s.taskItem}>
      {editing && (
        <Modal>
          <EditTask editTask={editTask} handleToggle={toggleEdit} task={task} />
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
    </li>
  );
}

// export default class Task extends Component {
//   handleUpdateStatus = (newStatus, points, memberId, taskId) => {
//     const { householdId, approveTask, rejectTask } = this.props;

//   render() {
//     const { task, editTask, householdId } = this.props;
//     const { editing, error } = this.state;

//     return (
//       <li key={task.id} className="task-item">
//         {editing ? (
//           <Modal>
//             <EditTask
//               editTask={editTask}
//               householdId={householdId}
//               handleToggle={this.toggleEdit}
//               task={task}
//             ></EditTask>
//           </Modal>
//         ) : null}
//         <p className="task-item-title">{task.title}</p>
//         <p className="task-item-points">Points: {task.points}</p>

//         {task.status === 'completed' ? (
//           <div className="task-item-buttons">
//             <button
//               onClick={() =>
//                 this.handleUpdateStatus(
//                   'approved',
//                   task.points,
//                   task.member_id,
//                   task.id
//                 )
//               }
//             >
//               <FontAwesomeIcon
//                 className="thumb-icon"
//                 icon={faThumbsUp}
//                 size="1x"
//                 color="#b1b1b1"
//               ></FontAwesomeIcon>
//             </button>
//             <button
//               onClick={() =>
//                 this.handleUpdateStatus(
//                   'assigned',
//                   task.points,
//                   task.member_id,
//                   task.id
//                 )
//               }
//             >
//               <FontAwesomeIcon
//                 className="thumb-icon"
//                 icon={faThumbsDown}
//                 size="1x"
//                 color=" #b1b1b1"
//               ></FontAwesomeIcon>
//             </button>
//           </div>
//         ) : (
//           <div className="task-item-buttons">
//             <button onClick={this.toggleEdit}>
//               <FontAwesomeIcon
//                 className="pen-icon"
//                 icon={faPencilAlt}
//                 size="1x"
//                 color="#b1b1b1"
//               />
//               <span>Edit</span>
//             </button>
//             <button onClick={() => this.handleDelete(task.id, task.member_id)}>
//               <FontAwesomeIcon
//                 className="trash-icon"
//                 icon={faTrashAlt}
//                 size="1x"
//                 color="#b1b1b1"
//               />
//               <span>Delete</span>
//             </button>
//           </div>
//         )}
//         {error ? (
//           <div className="alert">
//             <p className="alertMsg">{error}</p>
//           </div>
//         ) : null}
//       </li>
//     );
//   }
// }
