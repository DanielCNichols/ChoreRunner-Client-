import React, { Component } from 'react';

const HouseholdContext = React.createContext({
  households: [],
  memberTasks: [],
  error: null,
  setHouseholds: () => {},
  addHousehold: () => {},
  completeTask: () => {},
  setError: () => {},
  setTask: () => {},
  setTasks: () => {},
  task: '',
  tasks: {}
});

export default HouseholdContext;

export class HouseholdProvider extends Component {
  state = {
    households:[],
    memberTasks: [],
    error: null,
    task: '',
    tasks: {}
  };

  setHouseholds = households => {
    this.setState({
      households,
    });
  };

  addHousehold = newHousehold => {
    this.setHouseholds([...this.state.households, newHousehold]);
  };

  setMemberTasks = memberTasks => {
    this.setState({
      memberTasks
    });
  }

  setTask = task => {
    this.setState({ task })
  }

  setTasks = tasks => {
    this.setState({ tasks })
  }

  completeTask = taskId => {
    const newTasks = this.state.memberTasks.filter(
      memberTasks => memberTasks.id !== taskId
    );
    this.setState({ memberTasks: newTasks });
  };

  setError = error => {
    this.setState({error})
  }

  render() {
    const value = {
      households: this.state.households,
      task: this.state.task,
      tasks: this.state.tasks,
      memberTasks: this.state.memberTasks,
      error: this.state.error,
      setHouseholds: this.setHouseholds,
      setMemberTasks: this.setMemberTasks,
      addHousehold: this.addHousehold,
      setError: this.setError,
      setTask: this.setTask,
      setTasks: this.setTasks,
      completeTask: this.completeTask,
      setError: this.setError
    };
    
    return (
      <HouseholdContext.Provider value={value}>
        {this.props.children}
      </HouseholdContext.Provider>
    );
  }
}
