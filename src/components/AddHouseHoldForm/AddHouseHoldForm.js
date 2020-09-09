import React, { Component } from 'react';
import s from './AddHouseHoldForm.css';
import ApiService from '../../services/api-service';

export default class AddHouseHoldForm extends Component {
  state = {
    householdName: '',
    errors: {
      inputErrors: null,
      error: null,
    },
  };

  handleInputChange = ev => {
    this.setState({ householdName: ev.target.value });
  };

  validateInput() {
    if (this.state.householdName.length < 1) {
      this.setState({ errors: { inputErrors: 'Household name is required' } });
    }
  }

  handleHousholdSubmit = async ev => {
    try {
      ev.preventDefault();

      if (this.state.errors.inputErrors) {
        return;
      }

      let res = await ApiService.postHousehold(this.state.householdName);

      res.members = [];
      this.props.handleAdd(res);
    } catch (error) {
      this.setState({ errors: { error: error } });
    }
  };

  render() {
    const { handleCancel } = this.props;
    return (
      <form
        className="add-household-form"
        onSubmit={ev => this.handleHousholdSubmit(ev)}
      >
        <fieldset>
          <legend>Add a Group</legend>
          <label className="add-house-label" htmlFor="householdName">
            {' '}
            Group Name
          </label>
          {this.state.errors.inputErrors && (
            <p>{this.state.errors.inputErrors}</p>
          )}
          <input
            onBlur={() => this.validateInput()}
            onChange={ev => this.handleInputChange(ev)}
            name="householdName"
            type="text"
            value={this.state.householdName}
            ref={input => (this.householdName = input)}
          ></input>
          <button className="submitHH" type="submit">
            Create new group
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </fieldset>
      </form>
    );
  }
}
