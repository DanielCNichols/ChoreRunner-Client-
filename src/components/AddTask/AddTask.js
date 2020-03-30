import React from 'react';
import HouseholdContext from '../../contexts/HouseHoldContext';
import './AddTask.css';

export default class AddTask extends React.Component {
  state = {
    title: '',
    points: '',
    member_id: '',
    error: null
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

  render() {
    const {members, handleCancel} = this.props;
    const {error} = this.state;
    console.log(members)



    return (
      <form className="task-form">
        <fieldset>
          <legend>Assign Tasks</legend>
          <label htmlFor="taskName">Task Name</label>
          <input onChange={this.onChangeHandle} type="text" name="title" />

          <label htmlFor="assignee">Assign to</label>
          <select onChange={this.onSelectChangeHandle} name="assignee" className="select-css" defaultValue="Please select a member">
            <option value="">Please select a member</option>
            {members.map(member => {
              return (
                <option key={member.id} value={member.id}>{member.name}</option>
              )
            })}
          </select>

          <label htmlFor="points">Points</label>
          <input onChange={this.onChangeHandle} type="number" min="1" max="100" />
        <button type="submit" >Assign Task</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
        </fieldset>

        <div className="alert">
          {error ? <p className="alertMsg">{error}</p> : null}
        </div>
      </form>
    );
  }
}
