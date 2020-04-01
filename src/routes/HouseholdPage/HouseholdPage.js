import React, { Component } from 'react';
import AddTask from '../../components/AddTask/AddTask';
import ApiService from '../../services/api-service';
import HouseholdContext from '../../contexts/HouseHoldContext';
import MembersList from '../../components/MembersList/MembersList';
import Modal from '../../components/Modal/Modal';
import './HouseholdPage.css';

export default class HouseholdPage extends Component {
  state = {
    membersList: [],
    tasks: {},
    task: '',
    editMember: false,
    addTask: false,
    editTask: false,
    error: null,
  };

  static contextType = HouseholdContext;

  componentDidMount() {
    this.updateEverything();
  }

  //----- Re-get the updated values so the page can be updated with the new values -----
  updateEverything = () => {
    const household_id = this.props.match.params.id;
    ApiService.getMembers(household_id).then(members => {
      this.setState({
        membersList: members,
      });
    });
    ApiService.getTasksForAll(household_id).then(tasks => {
      this.setState({tasks: tasks});
    });
  };

  //Member callbacks
  updateMembersList = updatedMember => {
    let newMembers = this.state.membersList.map(member =>
      member.id !== updatedMember.id ? member : updatedMember
    );
    this.setState({
      membersList: newMembers,
    });
    let tasks = this.context.tasks;
    tasks[updatedMember.id].name = updatedMember.name;
    tasks[updatedMember.id].username = updatedMember.username;
    this.context.setTasks(tasks);
  };

  toggleEditMember = () => {
    this.setState({ editMember: !this.state.editMember });
  };

  handleDeleteMember = (id, household_id) => {
    ApiService.deleteMember(id, household_id)
      .then(() => {
        let newMembers = this.state.membersList.filter(
          member => member.id !== id
        );
        this.setState({ membersList: newMembers });
        let tasks = this.context.tasks;
        delete tasks[id];
        this.context.setTasks(tasks);
      })
      .catch(error => this.context.setError(error));
  };

  handleTaskDelete = (task_id, member_id) => {
    const household_id = this.props.match.params.id;
    let tasks = this.context.tasks;
    let memberTaskList = tasks[member_id];
    let filteredTasks = memberTaskList.tasks.filter(task => {
      return task.id !== task_id;
    });
    tasks[member_id].tasks = filteredTasks;
    ApiService.deleteTask(household_id, task_id)
      .then(() => this.context.setTasks(tasks))
      .then(() => {
        this.updateMembersList();
      })
      .catch(error => this.context.setError(error));
  };

  toggleAddTasks = () => {
    this.setState({ addTask: !this.state.addTask });
  };



  //This method takes the response of the fetch call in the handleSubmit function in the AddTasks form. It effectively pushes the new task to the list in the state, under the appropriate member. Errors are handled in the Add Form itself. 
  handleAddTasks = (newTask) => {
      let updated = this.state.tasks[newTask.member_id]
      updated.tasks.push(newTask)
      let newTaskList = this.state.tasks;
      newTaskList[newTask.member_id] = updated;
      this.setState({tasks: newTaskList})  
  } 

  handleResetScores = () => {
    let household_id = this.props.match.params.id;
    ApiService.resetScores(household_id)
      .then(res => {
        const { tasks } = this.context;
        for (let member in tasks) {
          tasks[member].total_score = 0;
        }
        this.setState({tasks: tasks})
      })
      .catch(error => this.context.setError(error));
  };

  // Editing tasks should be held outside of the member list to pass less things down. It will follow the modal design pattern. 

  //"tasks" come from context, and it looks something like : 

  // tasks = {
  //   5: {member_id: 5, name: Kelley, username: kells, total_score: 23}
  // }

  // Then they use Object.values to just grab the actual task from the task object. This seems complicated. Take a look at this. 

  // 1. Moved the task source from context to the state, because now we can directly manipulate it withinin the class and pass the handler as props. (We will need to mark its status and update name/points eventually.)

  render() {
    const { tasks, addTask, error } = this.state;
    const data = Object.values(tasks);
    const household_id = this.props.match.params.id;
    // console.log("This is the data", data)
    // console.log("This is the task", tasks)
    console.log("this is the error", error)

    return (
      <section className="parent_dashboard household-page">
        <h3>Household page</h3>
        <div className="dash-buttons">
          <button onClick={this.toggleAddTasks}>+ Assign Tasks</button>
          <button onClick={this.handleResetScores} className="reset-all-scores">
            reset all scores
          </button>
          </div>
          {addTask ? (
            <Modal>
              <AddTask
                householdId = {household_id}
                members={this.state.membersList}
                updateEverything={this.updateEverything}
                handleAdd ={this.handleAddTasks}
                handleToggle={this.toggleAddTasks}
                error = {error}
              ></AddTask>
            </Modal>
          ) : null}

        <MembersList
          tasks={tasks}
          data={data}
          household_id={this.props.match.params.id}
          editMember={this.state.editMember}
          updateMembersList={this.updateMembersList}
          toggleEditMember={this.toggleEditMember}
          handleDeleteMember={this.handleDeleteMember}
          handleTitleChange={this.handleTitleChange}
          handlePointsChange={this.handlePointsChange}
          handleTaskDelete={this.handleTaskDelete}
        />
      </section>
    );
  }
}
