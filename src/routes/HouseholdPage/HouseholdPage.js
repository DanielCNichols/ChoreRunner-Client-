import React, { Component } from 'react';
import AddTask from '../../components/AddTask/AddTask';
import ApiService from '../../services/api-service';
import HouseholdContext from '../../contexts/HouseHoldContext';
import MembersList from '../../components/MembersList/MembersList';
import Modal from '../../components/Modal/Modal';
import MembersCard from '../../components/MembersCard/MembersCard';
import './HouseholdPage.css';

//Can this be simplified to send a fetch that just grabs ALL of the information and inlcudes the tasks in the array? state.membersList and state.tasks look very similar, and it seems confusing.

export default class HouseholdPage extends Component {
  state = {
    membersList: [],
    error: null,
  };

  static contextType = HouseholdContext;

  componentDidMount() {
    const household_id = this.props.match.params.id;
    ApiService.getMembers(household_id).then(members => {
      this.setState({
        membersList: members,
      });
    });
  }

  
  //Member callbacks
  toggleEditMember = () => {
    this.setState({ editMember: !this.state.editMember });
  };


  handleDeleteMember = id => {
    let householdId = this.props.match.params.id;
    ApiService.deleteMember(id, householdId)
      .then(() => {
        let list = this.state.membersList.filter(member => {
          return member.id !== id;
        });
        this.setState({ membersList: list });
      })
      .catch(error => this.setState(error));
  };

  handleApproveTask = (points, memberId, taskId) => {
    //find the member
    let idx = this.findMemberIndex(memberId);
    let updateMember = this.state.membersList[idx];
    updateMember.total_score = updateMember.total_score += points;
    updateMember.tasks = updateMember.tasks.filter(task => task.id !== taskId);

    let newList = this.refreshMemberList(updateMember);
    this.setState({ membersList: newList });
  };

  handleRejectTask = (memberId, taskId, newStatus) => {
    let idx = this.findMemberIndex(memberId);
    let updateMember = this.state.membersList[idx];
    updateMember.tasks.find(task => task.id === taskId).status = newStatus;
    let newList = this.refreshMemberList(updateMember);
    this.setState({ membersList: newList });
  };

  refreshMemberList(updated) {
    return this.state.membersList.map(member => {
      return member.id === updated.id ? updated : member;
    });
  }

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

  handleDeleteTask = (task_id, member_id) => {
    const { membersList } = this.state;

    let idx = this.findMemberIndex(member_id);
    let newList = membersList[idx].tasks.filter(task => task.id !== task_id);

    let updatedMember = membersList[idx];
    updatedMember.tasks = newList;

    let updated = membersList.map(member => {
      return member.id === updatedMember.id ? updatedMember : member;
    });

    this.setState({ membersList: updated });
  };

  findMemberIndex(id) {
    return this.state.membersList.findIndex(member => member.id === id);
  }

  toggleAddTasks = () => {
    this.setState({ addTask: !this.state.addTask });
  };

  //This method takes the response of the fetch call in the handleSubmit function in the AddTasks form. It effectively pushes the new task to the list in the state, under the appropriate member. Errors are handled in the Add Form itself.
  handleAddTasks = newTask => {
    let idx = this.findMemberIndex(newTask.member_id);
    let updated = this.state.membersList[idx];
    updated.tasks.push(newTask);

    let newList = this.refreshMemberList(updated);
    this.setState({ membersList: newList });
  };

  handleEditTasks = updatedTask => {
    //find the appropriate member in the list
    let idx = this.state.membersList.findIndex(
      member => member.id === updatedTask.member_id
    );

    let newList = this.state.membersList[idx].tasks.map(task => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    let updatedMember = this.state.membersList[idx];
    updatedMember.tasks = newList;

    //update the list and set state

    let updated = this.state.membersList.map(member => {
      return member.id === updatedMember.id ? updatedMember : member;
    });

    this.setState({ membersList: updated });
  };

  setScoreToZero() {
    let list = this.state.membersList;

    list.forEach(member => member.total_score = 0)
    
    this.setState({membersList: list})
  }

  handleResetScores = () => {
    let household_id = this.props.match.params.id;
    ApiService.resetScores(household_id)
      .then(res => {
        this.setScoreToZero()
      })
      .catch(error => this.context.setError(error));
  };

  approveTask = id => {};

  toggleEditTask = () => {
    this.setState({ editTask: !this.state.editTask });
  };

  handleEditMember = updatedMember => {
    let list = this.refreshMemberList(updatedMember);
    console.log(list);

    this.setState({ membersList: list });
  };

  // Editing tasks should be held outside of the member list to pass less things down. It will follow the modal design pattern.

  //"tasks" come from context, and it looks something like :

  // tasks = {
  //   5: {member_id: 5, name: Kelley, username: kells, total_score: 23}
  // }

  // Then they use Object.values to just grab the actual task from the task object. This seems complicated. Take a look at this.

  // 1. Moved the task source from context to the state, because now we can directly manipulate it withinin the class and pass the handler as props. (We will need to mark its status and update name/points eventually.)

  render() {
    const { addTask } = this.state;
    // const data = Object.values(tasks);
    const household_id = this.props.match.params.id;

    return (
      <section className="parent_dashboard household-page">
        <h3>Household page</h3>
        <div className="dash-buttons">
          <button onClick={this.toggleAddTasks}>+ Assign Tasks</button>
          <button onClick={this.handleResetScores} className="reset-all-scores">
            reset all scores
          </button>
        </div>
        {addTask && this.state.membersList.length ? (
          <Modal>
            <AddTask
              householdId={household_id}
              members={this.state.membersList}
              handleAdd={this.handleAddTasks}
              handleToggle={this.toggleAddTasks}
            ></AddTask>
          </Modal>
        ) : null}

        {addTask && !this.state.membersList.length ? (
          <Modal>
            <div className="alert">
              <p className="alertMsg">Add Members First!</p>
              <button
                className="reset-all-scores"
                onClick={this.toggleAddTasks}
              >
                Cancel
              </button>
            </div>
          </Modal>
        ) : null}

        <section className="membersList">
          {this.state.membersList.map(member => {
            return (
              <MembersCard
                deleteMember={this.handleDeleteMember}
                editMember={this.handleEditMember}
                rejectTask={this.handleRejectTask}
                approveTask={this.handleApproveTask}
                deleteTask={this.handleDeleteTask}
                editTask={this.handleEditTasks}
                key={member.id}
                householdId={household_id}
                member={member}
                tasks={member.tasks}
              ></MembersCard>
            );
          })}
        </section>
      </section>
    );
  }
}
