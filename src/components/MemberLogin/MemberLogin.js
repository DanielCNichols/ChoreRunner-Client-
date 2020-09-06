import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import { Fieldset, Input, FormElement, Label, Legend } from '../Form/Form';
import s from './MemberLogin.module.css';

export default class MemberLogin extends Component {
  static contextType = UserContext;

  state = {
    username: '',
    password: '',
    error: null,
  };

  onChangeHandle = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/member-dashboard';
    history.push(destination);
  };

  handleSubmit = async e => {
    try {
      e.preventDefault();
      const { username, password } = e.target;

      this.setState({ error: null });

      let res = await AuthApiService.postMemberLogin({
        username: username.value,
        password: password.value,
      });

      this.context.processLogin(res.authToken, res.type);
      this.onLoginSuccess();
    } catch (error) {
      this.setState({ error: error });
    }
  };

  render() {
    const { error, username, password } = this.state;

    return (
      <div className={s.container}>
        <form
          className={s.memberForm}
          id="member-login"
          onSubmit={this.handleSubmit}
        >
          <div className={s.demo}>
            <h3>Demo:</h3>
            <p>username: bartman</p>
            <p>password: bartman</p>
          </div>

          <Fieldset>
            <Legend>Member Login</Legend>
            <FormElement className={s.formElement}>
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                type="text"
                onChange={this.onChangeHandle}
                value={username}
                required
              />
            </FormElement>
            <FormElement className={s.formElement}>
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                onChange={this.onChangeHandle}
                value={password}
                required
              />
            </FormElement>
            <div role="alert">{error && <p>{error}</p>}</div>
            <button type="submit">login</button>
          </Fieldset>
        </form>
      </div>
    );
  }
}
