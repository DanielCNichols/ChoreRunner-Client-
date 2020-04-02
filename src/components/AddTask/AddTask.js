import React from 'react';
import HouseholdContext from '../../contexts/HouseHoldContext';
import ApiService from '../../services/api-service';
import './AddTask.css';

export default class AddTask extends React.Component {
  state = {
    title: '',
    points: '',
    member_id: '',
    error: null,
  };

  static contextType = HouseholdContext;

  onChangeHandle = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //Specifically for select option
  onSelectChangeHandle = e => {
    if (!!e.target.value) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = ev => {
    ev.preventDefault();

    let { householdId, handleAdd, handleToggle } = this.props;
    let { title, points, member_id } = this.state;

    // assemble the new task. Status is assigned by default in the db schema. Household id is passed in the route params in the api service.

    let newTask = {
      title,
      points,
      member_id,
    };

    //Post it and push it to the task list in Houshold page. 

    ApiService.addTask(householdId, newTask)
      .then(res => handleAdd(res))
      .then(() => handleToggle())
      // .catch(error => this.setState({ error: error.error.message }));
    };
    
    render() {
      const { members, handleToggle } = this.props;
      let { error } = this.state;
      
      return (
        <form className="task-form" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Assign Tasks</legend>
          <label htmlFor="taskName">Task Name</label>
          <input onChange={this.onChangeHandle} type="text" name="title" />

          <label htmlFor="assignee">Assign to</label>
          <select
            onChange={this.onSelectChangeHandle}
            name="member_id"
            className="select-css"
            defaultValue="Please select a member"
          >
            <option value="">Please select a member</option>
            {members.map(member => {
              return (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              );
            })}
          </select>

          <label htmlFor="points">Points</label>
          <input
            onChange={this.onChangeHandle}
            type="number"
            min="1"
            max="100"
            name="points"
          />
          <button type="submit">Assign Task</button>
          <button type="button" onClick={handleToggle}>
            Cancel
          </button>
        </fieldset>

        <div className="alert">
          {error ? <p className="alertMsg">{error}</p> : null}
        </div>
      </form>
    );
  }
}
