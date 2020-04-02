import React from 'react';
import ApiService from '../../services/api-service';
import './EditTask.css';

export default class EditTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      householdId: this.props.householdId,
      id: this.props.task.id,
      title: this.props.task.title,
      points: this.props.task.points,
      error: null,
    };
  }

  componentDidMount() {
    console.log('taskFormLoaded');
  }

  onChangeHandle = ev => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };

  handleUpdateTask = ev => {
    ev.preventDefault();

    let { title, points, id, householdId } = this.state;

    let updatedTask = {
      title,
      points,
      id,
    };

    //The patch request will return the updated task as an object, which should be used to update the task array in the houshold page state using callbacks.
    ApiService.updateTask(householdId, updatedTask)
      .then(res => this.props.editTask(res))
      .then(this.props.handleToggle())
      .catch(error => this.setState(error));
  };

  render() {
    let { title, points, error } = this.state;
    let { handleToggle } = this.props;

    return (
      <form className="edit-task-form" onSubmit={this.handleUpdateTask}>
        <fieldset>
          <legend>Edit Task</legend>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.onChangeHandle}
          />
          <label htmlFor="points">Point Value</label>
          <input
            type="number"
            name="points"
            min="1"
            max="100"
            value={points}
            onChange={this.onChangeHandle}
          />
          <button type="submit">Update Task</button>
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
