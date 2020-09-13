import React, { useState } from 'react';
import ApiService from '../../services/api-service';
import './EditMember.css';
import { Fieldset, Input, Label, FormElement, Legend } from '../Form/Form';

export default function EditMember({
  editMember,
  toggleEdit,
  member: { id, household_id, name, username, password },
}) {
  const [inputs, setInputs] = useState({
    name: name,
    username: username,
    password: '',
    confirmPass: '',
  });

  const [passwordTouched, setPasswordTouched] = useState(false);

  const [error, setError] = useState({
    name: null,
    username: null,
    password: null,
    confirmPass: null,
    server: null,
  });

  function handleInputChange(ev) {
    ev.persist();
    setInputs(input => ({
      ...inputs,
      [ev.target.name]: ev.target.value,
    }));
  }

  function toggleTouched() {
    setPasswordTouched(true);
  }

  function validateInputs() {
    let { name, username, password, confirmPass } = inputs;
    let errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }

    if (!username) {
      errors.username = 'Username is required';
    }

    if (passwordTouched) {
      if (!password) {
        errors.password = 'Password is required';
      }

      if (!confirmPass || confirmPass !== password) {
        errors.confirmPass = 'Passwords must match';
      }
    }

    console.log('these are the errors', errors);
    return errors;
  }

  function resetErrors() {
    setError({
      name: null,
      username: null,
      password: null,
      confirmPass: null,
      server: null,
    });
  }
  async function handleEditSubmit(ev) {
    console.log('submitting');
    try {
      resetErrors();
      ev.preventDefault();
      let errors = validateInputs();

      if (Object.keys(errors).length) {
        console.log('errors');
        return setError(errors);
      }

      let updatedMember = {
        name: inputs.name,
        username: inputs.username,
        password: passwordTouched ? inputs.password : password,
      };

      let update = await ApiService.editMember(updatedMember, household_id, id);

      console.log('updated member', update);

      editMember(update);
    } catch (serverError) {
      setError({ ...error, server: serverError });
    }
  }

  return (
    <form onSubmit={handleEditSubmit} className="edit-member-form">
      <fieldset>
        <legend>Edit Member</legend>
        <label htmlFor="member-name">Name</label>
        <input
          type="text"
          name="name"
          value={inputs.name}
          onChange={handleInputChange}
        ></input>
        <label htmlFor="child-username">Child username</label>
        <input
          type="text"
          name="username"
          value={inputs.username}
          onChange={handleInputChange}
        ></input>
        <label htmlFor="child-password">Child password</label>
        <input
          type="password"
          name="password"
          onFocus={toggleTouched}
          onChange={handleInputChange}
        ></input>

        <input
          type="password"
          name="confirmPass"
          onChange={handleInputChange}
        ></input>
        <div className="valid-error"></div>
        <button type="submit" className="submit-edit-member">
          Submit Changes
        </button>
        <button type="button" onClick={toggleEdit} className="cancel">
          Cancel
        </button>
      </fieldset>
    </form>
  );
}

// export default class EditMember extends React.Component {
//   constructor(props) {
//     let { id, name, username, password } = props.member;
//     super(props);
//     this.state = {
//       id,
//       name,
//       username,
//       password,
//       touched: false,
//       error: null,
//       validateError: {
//         nameError: '',
//         usernameError: '',
//         passwordError: '',
//       },
//     };
//   }

//   onChangeHandle = e => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };

//   toggleTouched = () => {
//     this.setState({ touched: true });
//   };

//   validate = (name, username, pass) => {
//     let nameError = '';
//     let usernameError = '';
//     let passwordError = '';

//     if (name.length <= 2) {
//       nameError = 'Please enter 3 characters or more';
//     }

//     // Validates child's username
//     if (username.length > 50 || username.length < 3) {
//       usernameError = 'Your name must be less than 50 characters';
//     }

//     //validate the password
//     if (pass) {
//       if (pass.length > 10 || pass.length < 4) {
//         passwordError =
//           'Your password must be more than 4 and less than 40 characters';
//       }
//     }

//     if (nameError || usernameError || passwordError) {
//       this.setState({
//         validateError: { usernameError, nameError, passwordError },
//       });
//       return false;
//     }
//     return true;
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     let { householdId } = this.props;

//     let updatedMember = {
//       id: this.state.id,
//       name: this.state.name.trim(),
//       username: this.state.username.trim(),
//       password: this.state.touched ? this.state.password.trim() : null,
//     };

//     let isValid = this.validate(
//       updatedMember.name,
//       updatedMember.username,
//       updatedMember.password
//     );

//     if (isValid) {
//       ApiService.editMember(updatedMember, householdId, this.state.id)
//         .then(res => {
//           this.props.editMember(res);
//           this.props.toggleForm();
//         })
//         .catch(error => this.setState({ error: error.error }));
//     }
//   };

//   render() {
//     const {
//       usernameError,
//       nameError,
//       passwordError,
//     } = this.state.validateError;
//     const { error, name, username } = this.state;
//     return (
//       <form onSubmit={this.handleSubmit} className="edit-member-form">
//         <fieldset>
//           <legend>Edit Member</legend>
//           <label htmlFor="member-name">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={name}
//             onChange={this.onChangeHandle}
//           ></input>
//           <label htmlFor="child-username">Child username</label>
//           <input
//             type="text"
//             name="username"
//             value={username}
//             onChange={this.onChangeHandle}
//           ></input>
//           <label htmlFor="child-password">Child password</label>
//           <input
//             type="password"
//             name="password"
//             onFocus={this.toggleTouched}
//             onChange={this.onChangeHandle}
//           ></input>
//           <div className="valid-error">
//             {nameError || usernameError || passwordError || error}
//           </div>
//           <button type="submit" className="submit-edit-member">
//             Submit Changes
//           </button>
//           <button
//             type="button"
//             onClick={this.props.toggleEdit}
//             className="cancel"
//           >
//             Cancel
//           </button>
//         </fieldset>
//       </form>
//     );
//   }
// }
