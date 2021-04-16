import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.renderPassword2Errors = this.renderPassword2Errors.bind(this);
    this.renderUsernameErrors = this.renderUsernameErrors.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleConfirmPasswordChange(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  getConfirmPasswordErrorClass() {
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    if (confirmPassword == null || password == null) {
      return "";
    } else if (password !== confirmPassword) {
      return "is-invalid";
    } else {
      return "is-valid";
    }
  }

  async handleSubmit(event) {
    //do basic password authentication before sending request to backend
    if (this.state.password !== this.state.confirmPassword) {
      return;
    }
    if (this.state.password == undefined) {
      return;
    }
    if (this.state.password.length <= 0) {
      return;
    }

    //send post request to backend
    const createAccountUrl = "api/accounts/new/";
    const account = await axios.post(createAccountUrl, {
      username: this.state.email,
      password: this.state.password,
    });

    //if there are no errors in the account creation form
    if (account.status == 201) {
      this.props.accountCreated();
      return 0;
    }

    //parse the errors from the form into json
    var account_data = JSON.parse(account.data);

    //if there are username errors
    if (account_data.username) {
      //add each error to messages and add them to state
      var messages = [];
      for (var message in account_data.username) {
        messages.push(account_data.username[message]);
      }
      this.setState({ usernameError: messages });
    } else {
      //if no username errors set state to none
      this.setState({ usernameError: [] });
    }

    //if there are password errors
    if (account_data.password2) {
      //add each error to messages and add them to state
      var messages = [];
      for (var message in account_data.password2) {
        var m = account_data.password2[message];
        messages = messages.concat(m);
      }
      this.setState({
        password2Error: messages,
      });
    } else {
      //if no password errors set state to none
      this.setState({
        password2Error: [],
      });
    }

    //prevent form submission
    event.preventDefault();
  }

  renderUsernameErrors() {
    //renders all username errors if there are any
    if (!this.state.usernameError) {
      return null;
    }
    var error = this.state.usernameError.map(function (message) {
      return <Form.Text className="text-danger">{message.message}</Form.Text>;
    });
    return error;
  }
  renderPassword2Errors() {
    //renders all password errors if there are any
    if (!this.state.password2Error) {
      return null;
    }
    var error = this.state.password2Error.map(function (message) {
      return <Form.Text className="text-danger">{message.message}</Form.Text>;
    });
    return error;
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Enter Username"
            onChange={this.handleUserNameChange}
          />
          {this.renderUsernameErrors()}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={this.handlePasswordChange}
          />
          <Form.Text className="text-muted">
            passwords must be at least 8 characters and must not be entirely
            numeric
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            className={this.getConfirmPasswordErrorClass()}
            type="password"
            placeholder="Password"
            onChange={this.handleConfirmPasswordChange}
          />
          {this.renderPassword2Errors()}
        </Form.Group>
        <p className="text-center">
          have an account?{" "}
          <a href="#" onClick={this.props.toggleForm}>
            login
          </a>
        </p>
        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    );
  }
}

export default CreateAccount;
