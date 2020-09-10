import React from 'react';
import ApiService from '../../services/api-service';
import HouseholdContext from '../../contexts/HouseHoldContext';
import { FormElement, Label, Input, Fieldset, Legend } from '../Form/Form';
import s from './AddMembers.module.css';

export default class AddMembers extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    household_id: this.props.id,
    error: null,
    validateError: {
      usernameError: '',
      householdError: '',
    },
  };
  static contextType = HouseholdContext;

  validate = () => {
    let username = this.state.username.trim();
    let household = this.state.household_id;
    let usernameError = '';
    let householdError = '';

    // Validates child's username
    if (username.length > 50) {
      usernameError = 'Your name must be less than 50 characters';
    }

    //Validates Select Household
    if (household === '') {
      householdError = 'Please select a household';
    }

    if (usernameError || householdError) {
      this.setState({ validateError: { usernameError, householdError } });
      return false;
    }

    return true;
  };

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

  handleSubmit = e => {
    e.preventDefault();
    let isValid = this.validate();
    const { household_id } = this.state;

    let newMember = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      household_id: household_id,
    };

    if (isValid) {
      ApiService.addHouseholdMember(household_id, newMember)
        .then(member => {
          this.setState({
            name: '',
            username: '',
            password: '',
            error: null,
          });
          this.props.handleAddMembers(member);
          this.props.toggleAddMember();
        })
        .catch(res => this.setState({ error: res.error }));
      this.setState({ error: 'Success!' });
    }
  };

  render() {
    const { error } = this.state;
    const { usernameError, householdError } = this.state.validateError;
    return (
      <form onSubmit={this.handleSubmit} className={s.addMemberForm}>
        <Fieldset>
          <Legend className="videoGameTitles">Add Member</Legend>
          <FormElement className={s.formElement}>
            <Label htmlFor="member-name">Name</Label>
            <Input
              type="text"
              id="member-name"
              name="name"
              required
              onChange={this.onChangeHandle}
              value={this.state.name}
            />
          </FormElement>
          <FormElement className={s.formElement}>
            <Label htmlFor="child-username">Member Username</Label>
            <Input
              type="text"
              id="child-username"
              name="username"
              required
              onChange={this.onChangeHandle}
              value={this.state.username}
            />
          </FormElement>
          <FormElement className={s.formElement}>
            <Label htmlFor="child-password">Member Password</Label>
            <Input
              type="password"
              id="child-password"
              name="password"
              required
              onChange={this.onChangeHandle}
              value={this.state.password}
            />
          </FormElement>

          <div className={s.formButtons}>
            <button type="submit" className="arcadeButton">
              Add Member
            </button>
            <button
              className="arcadeButton"
              type="button"
              onClick={() => this.props.toggleAddMember()}
            >
              Cancel
            </button>
          </div>
          <div role="alert">
            {
              <p className="alertMsg">
                {error || householdError || usernameError}
              </p>
            }
          </div>
        </Fieldset>
      </form>
    );
  }
}
