import React, { Component } from 'react';
import s from './AddHouseHoldForm.module.css';
import {
  Input,
  FormElement,
  Fieldset,
  Label,
  Legend,
} from '../../components/Form/Form';
import ApiService from '../../services/api-service';

export default class AddHouseHoldForm extends Component {
  state = {
    householdName: '',
    feedback: null,
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

      this.setState({ feedback: 'success!' });

      setTimeout(() => {
        this.props.toggleAdd();
      }, 500);
    } catch (error) {
      this.setState({ errors: { error: error } });
    }
  };

  render() {
    const { handleCancel } = this.props;
    return (
      <form
        className={s.addHouseholdForm}
        onSubmit={ev => this.handleHousholdSubmit(ev)}
      >
        <Fieldset>
          <Legend>Add a Group</Legend>
          <Label htmlFor="householdName">Group Name</Label>
          {this.state.errors.inputErrors && (
            <p>{this.state.errors.inputErrors}</p>
          )}
          <FormElement>
            <Input
              onBlur={() => this.validateInput()}
              onChange={ev => this.handleInputChange(ev)}
              name="householdName"
              type="text"
              value={this.state.householdName}
              ref={input => (this.householdName = input)}
            />
          </FormElement>

          {this.state.feedback && (
            <p style={{ color: 'white' }}> {this.state.feedback}</p>
          )}

          <div className={s.formButtons}>
            <button
              className="arcadeButton"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="arcadeButton" type="submit">
              Create
            </button>
          </div>
        </Fieldset>
      </form>
    );
  }
}
