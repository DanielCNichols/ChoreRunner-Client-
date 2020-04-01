import React from 'react';
import Modal from '../Modal/Modal';

export default class MembersCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assignedTasks: [],
      completedTasks: [],
      editingTask: false,
      editingMember: false,
      error: null,

    };
  }

  componentDidMount() {
      this.arrangeTasks();
  }
  
  arrangeTasks() {
      let {tasks} = this.props.member
      let assigned = [];
      let completed = [];

      tasks.map ((task => {
          task.status === "assigned" ? assigned.push(task) : completed.push(task)
      }))

      this.setState({assignedTasks: assigned, completedTasks: completed })
  }

  toggleTaskForm = () => {
    this.setState({ editingTask: !this.state.editingTask });
  };

  toggleMemberForm = () => {
    this.setState({ editingMember: !this.state.editingMember });
  };

  render() {
    const { member } = this.props;
    const { editingTask, editingMember, assignedTasks, completedTasks} = this.state;

    return (
      <div className="memberCard">
        <button onClick={this.toggleTaskForm}>Edit Task</button>
        <button onClick={this.toggleMemberForm}>Edit Member</button>
        
        {editingTask ? <Modal><p>Editing the task</p></Modal> : null}
        {editingMember ? <Modal><p>Editing the Member</p></Modal> : null}
        <p>{member.name}</p>
        <ul>Assigned
            {assignedTasks.map(task => {
                return <li key={task.id}>{task.title}
                </li>
            })}
        </ul>
        <ul>completed
            {completedTasks.map(task => {
                return <li key={task.id}>{task.title}
                <button>Approve!</button>
                </li>
            })}
        </ul>

      </div>
    );
  }
}
