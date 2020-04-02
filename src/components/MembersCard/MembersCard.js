import React from 'react';
import Modal from '../Modal/Modal';
import EditMember from '../EditMember/EditMember';
import Task from '../Task/Task'

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
      return task.status === 'assigned' ? assigned.push(task) : completed.push(task);
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
    const { member, householdId, editMember, editTask, tasks, approveTask, rejectTask, deleteTask} = this.props;
    const {
      assignedTasks,
      completedTasks,
      editingMember
    } = this.state;

    return (
      <div className="memberCard">

        <p>{member.name}</p>
        <p>{member.total_score}</p>
        <button onClick={this.toggleMemberForm}>Edit Member</button>
        {editingMember ? <Modal><EditMember householdId={householdId} editMember={editMember} handleCancel={this.toggleMemberForm} member={member}></EditMember></Modal> : null}
        {/* Put each task as its own component.  */}
        <ul>
          Assigned
          {tasks.map(task => {
            return task.status === "assigned" ? <Task deleteTask={deleteTask} editTask={editTask} key={task.id} householdId={householdId} task={task}/> : null

          })}
        </ul>
        <ul>
          completed
          {tasks.map(task => {
            return task.status === "completed" ? 
              <Task key={task.id} rejectTask={rejectTask} approveTask={approveTask} householdId={householdId} task={task}/> : null
          })}
        </ul>
      </div>
    );
  }
}
