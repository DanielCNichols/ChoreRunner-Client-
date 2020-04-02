import React from 'react';
import Modal from '../Modal/Modal';
import EditMember from '../EditMember/EditMember';
import Task from '../Task/Task';
import './MembersCard.css';

export default class MembersCard extends React.Component {
  state = {
    assignedTasks: [],
    completedTasks: [],
    editingMember: false,
    error: null,
  };

  componentDidMount() {
    this.arrangeTasks();
  }

  arrangeTasks() {
    let { tasks } = this.props.member;
    let assigned = [];
    let completed = [];

    tasks.map(task => {
      return task.status === 'assigned'
        ? assigned.push(task)
        : completed.push(task);
    });

    this.setState({ assignedTasks: assigned, completedTasks: completed });
  }

  toggleTaskForm = () => {
    this.setState({ editingTask: !this.state.editingTask });
  };

  toggleMemberForm = () => {
    this.setState({ editingMember: !this.state.editingMember });
  };

  render() {
    const {
      member,
      householdId,
      editMember,
      editTask,
      tasks,
      approveTask,
      rejectTask,
      deleteMember,
      deleteTask,
    } = this.props;

    const { editingMember, assignedTasks, completedTasks } = this.state;

    return (
      <div className="memberCard">
        <h3>{member.name}</h3>
        <p className="score">Score: {member.total_score}</p>

        {editingMember ? (
            <Modal>
            <EditMember
              householdId={householdId}
              editMember={editMember}
              handleCancel={this.toggleMemberForm}
              member={member}
            ></EditMember>
          </Modal>
        ) : null}
        {/* Put each task as its own component.  */}
        <div className="task-container">
        <hr className="member-rule"></hr>
          <ul>
            <h4>Assigned Tasks</h4>
            {assignedTasks.length ? 
            tasks.map(task => {
              return task.status === 'assigned' ? (
                <Task
                  deleteTask={deleteTask}
                  editTask={editTask}
                  key={task.id}
                  householdId={householdId}
                  task={task}
                />
              ) : null;
            }) : <li><p>No tasks assigned</p></li>}
          </ul>
          <ul>
            <h4>Completed</h4>
            {completedTasks.length ? 
            tasks.map(task => {
              return task.status === 'completed' ? (
                <Task
                  key={task.id}
                  rejectTask={rejectTask}
                  approveTask={approveTask}
                  householdId={householdId}
                  task={task}
                />
              ) : null;
            }) : <li><p>No tasks completed</p></li>}
          </ul>
        </div>
        <div className="memberCard-button-container">
          <button onClick={this.toggleMemberForm}>Edit</button>
          <button
            onClick={() => {
              deleteMember(member.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
