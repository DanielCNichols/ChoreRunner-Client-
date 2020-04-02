import React from 'react';
import ApiService from '../../services/api-service';
//import HouseHoldContext from '../../contexts/HouseHoldContext'
import './EditMember.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export default class EditMember extends React.Component {
  constructor(props) {
    console.log(props.member);
    let { id, name, username, password } = props.member;
    super(props);
    this.state = {
      id,
      name,
      username,
      password,
      touched: false,
      error: null,
      validateError: {
        nameError: '',
        usernameError: '',
        passwordError: '',
      },
    };
  }

  onChangeHandle = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleTouched = () => {
    this.setState({touched: true})
  }

  validate = (name, username, pass) => {
    let nameError = '';
    let usernameError = '';
    let passwordError ='';

    if (this.state.name.length <= 2) {
      nameError = 'Please enter 3 characters or more';
    }

    // Validates child's username
    if (username.length > 50) {
      usernameError = 'Your name must be less than 50 characters';
    }

    //validate the password
    if (pass) {
      if (pass.length > 10 || pass.length < 4) {
      passwordError = 'Your password must be more than 4 and less than 40 characters'
    }
  }


    if (nameError || usernameError || passwordError) {
      this.setState({ validateError: { usernameError, nameError, passwordError } });
      return false;
    }
    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    let {householdId} = this.props
    
    let updatedMember = {
      id: this.state.id,
      name: this.state.name.trim(),
      username: this.state.username.trim(),
      password: this.state.touched ? this.state.password.trim() : null
    };
    
    let isValid = this.validate(updatedMember.name, updatedMember.username, updatedMember.password);
    console.log('This is the password being sent', updatedMember.password)

    if (isValid) {
      ApiService.editMember(updatedMember, householdId, this.state.id)
        .then(res => {
          //This.handleSomething
          this.props.editMember(res)
        })
        .catch(error => this.setState({ error: error.error }));
    }
  };


  render() {
    const { usernameError, nameError, passwordError } = this.state.validateError;
    const { error, name, username} = this.state;
    return (
      <form onSubmit={this.handleSubmit} id="edit-member-form">
        <fieldset>
          <legend>Edit Member</legend>
          <label htmlFor="member-name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.onChangeHandle}
          ></input>
          <label htmlFor="child-username">Child username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.onChangeHandle}
          ></input>
          <label htmlFor="child-password">Child password</label>
          <input
            type="password"
            name="password"
            onFocus={this.toggleTouched}
            onChange={this.onChangeHandle}
          ></input>
          <div className="valid-error">
            {nameError || usernameError || passwordError || error}
          </div>
          <button type="submit" className="submit-edit-member">
            Submit Changes
          </button>
          <button type="button" onClick={this.props.handleCancel} className="cancel">
            Cancel
          </button>
        </fieldset>
      </form>
    );
  }
}
