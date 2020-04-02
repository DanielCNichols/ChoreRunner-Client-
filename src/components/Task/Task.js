import React, { Component } from 'react';
// import ApiService from '../../services/api-service';
import EditTask from '../EditTask/EditTask'
import Modal from '../Modal/Modal'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faPencilAlt,
//   faTrashAlt,
//   faSave,
// } from '@fortawesome/free-solid-svg-icons';

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
    };
  }
 

  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  //WE WILL PASS IN THE METHODS FOR MANIPULATING THE TASK LIST THROUGH PROPS FROM THE HOUSHOLD PAGE. KEEP IT SIMPLE.





  render() {
    const { task, handleDeleteTask, editTask, householdId} = this.props;
    const {editing} = this.state;

    return (
      <li key={task.id} className="task-item">
        {editing ? <Modal><EditTask editTask={editTask} householdId={householdId} handleToggle={this.toggleEdit} task={task}></EditTask></Modal> : null}
        <p>{task.title}</p>
        <p>{task.points}</p>
        <button onClick={this.toggleEdit}>Edit Task</button>
        {task.status === "completed" ? <button>Approve</button> : null}
      </li>
    );
  }
}
