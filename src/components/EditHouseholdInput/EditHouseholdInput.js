import React, { Component } from 'react'
import ApiService from '../../services/api-service.js';
import HouseholdContext from '../../contexts/HouseHoldContext';

import './EditHouseholdInput.css'
export default class EditHouseholdInput extends Component {

  state = {
    name: this.props.name,
    id:this.props.id
  }

  static contextType = HouseholdContext;

  onChangeHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleEditHousehold = e => {
    e.preventDefault();
    const {id, name} = this.state;

    const newHousehold = {
      id,
      name,
    };

    ApiService.editHouseholdName(id, newHousehold)
      .then(res => this.context.updateHousehold(id, newHousehold))
      .catch(this.context.setError);

    this.props.handleCancel();
  };

  render() {
    return (
      <form className="edit-household-form" onSubmit={this.handleEditHousehold}>
        <fieldset>
          <legend>Edit Group</legend>
          <label>Group Name</label>
          <input
            name="name"
            value={this.state.name}
            onChange={e => {
              this.onChangeHandle(e)
              }}
          />
          <button type="submit">
            Update Group
          </button>
          <button type="button" onClick={this.props.handleCancel}>Cancel</button>
        </fieldset>
      </form>
    )
  }
}

