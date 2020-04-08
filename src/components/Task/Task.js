import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import EditTask from '../EditTask/EditTask';
import Modal from '../Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import './Task.css'

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      error: null,
    };
  }

  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing,
    });
  };

  handleDelete = (taskId, memberId) => {
    const { householdId } = this.props;
    ApiService.deleteTask(householdId, taskId)
      .then(() => this.props.deleteTask(taskId, memberId))
      .catch(error => this.setState(error));
  };


  handleUpdateStatus = (newStatus, points, memberId, taskId) => {
    const { householdId, approveTask, rejectTask } = this.props;

    ApiService.parentUpdateTaskStatus(taskId, householdId, newStatus, points, memberId)
    .then(() => {
      newStatus === "approved" ? approveTask(points, memberId, taskId) : rejectTask(memberId, taskId, newStatus)
    }).catch(error => this.setState(error))
  };

  render() {
    const { task, editTask, householdId } = this.props;
    const { editing, error } = this.state;

    return (
      <li key={task.id} className="task-item">
        {editing ? (
          <Modal>
            <EditTask
              editTask={editTask}
              householdId={householdId}
              handleToggle={this.toggleEdit}
              task={task}
            ></EditTask>
          </Modal>
        ) : null}
        <p className="task-item-title">{task.title}</p>
        <p className="task-item-points">Points: {task.points}</p>
    
        {task.status === 'completed' ? (
          <div className="task-item-buttons">
            <button onClick={() => this.handleUpdateStatus("approved", task.points, task.member_id, task.id)}>Approve</button>
            <button onClick={() => this.handleUpdateStatus("assigned", task.points, task.member_id, task.id)}>Disapprove</button>
          </div>
        ) : (
          <div className="task-item-buttons">
          <button onClick={this.toggleEdit}><FontAwesomeIcon className="pen-icon" icon={faPencilAlt} size="1x" color="#b1b1b1"/><span>Edit</span></button>
          <button onClick={() => this.handleDelete(task.id, task.member_id)}>
          <FontAwesomeIcon className="trash-icon" icon={faTrashAlt} size="1x" color="#b1b1b1"/>
          <span>Delete</span>
          </button>
          </div>
        )}
        {error ? (
          <div className="alert">
            <p className="alertMsg">{error}</p>
          </div>
        ) : null}
      </li>
    );
  }
}
