import React, { Component } from 'react';
import AddTask from '../../components/AddTask/AddTask';
import ApiService from '../../services/api-service';
import Modal from '../../components/Modal/Modal';
import MembersCard from '../../components/MembersCard/MembersCard';
import './HouseholdPage.css';

export default class HouseholdPage extends Component {
  state = {
    membersList: [],
    error: null,
  };

  componentDidMount() {
    const household_id = this.props.match.params.id;
    ApiService.getMembers(household_id).then(members => {
      this.setState({
        membersList: members,
      });
    });
  }

  // <--------------------------Helper Functions--------------->
  refreshMemberList(updated) {
    return this.state.membersList.map(member => {
      return member.id === updated.id ? updated : member;
    });
  }

  findMemberIndex(id) {
    return this.state.membersList.findIndex(member => member.id === id);
  }

  setScoreToZero() {
    let list = this.state.membersList;

    list.forEach(member => (member.total_score = 0));

    this.setState({ membersList: list });
  }

  // <--------------------------Member Functions--------------->
  handleResetScores = () => {
    let household_id = this.props.match.params.id;
    ApiService.resetScores(household_id)
      .then(res => {
        this.setScoreToZero();
      })
      .catch(error => this.context.setError(error));
  };

  toggleEditMember = () => {
    this.setState({ editMember: !this.state.editMember });
  };

  handleEditMember = updatedMember => {
    let list = this.refreshMemberList(updatedMember);

    this.setState({ membersList: list });
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

  // <--------------------------Task Functions Functions--------------->

  toggleAddTasks = () => {
    this.setState({ addTask: !this.state.addTask });
  };

  handleAddTasks = newTask => {
    let idx = this.findMemberIndex(newTask.member_id);
    let updated = this.state.membersList[idx];
    updated.tasks.push(newTask);

    let newList = this.refreshMemberList(updated);
    this.setState({ membersList: newList });
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

  render() {
    const { addTask } = this.state;
    const household_id = this.props.match.params.id;

    return (
      <section className="household-page">
        <h3>Group Page</h3>
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
