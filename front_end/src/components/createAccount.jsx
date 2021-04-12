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
    if (this.state.password !== this.state.confirmPassword) {
      return;
    }
    if (this.state.password == undefined) {
      return;
    }
    if (this.state.password.length <= 0) {
      return;
    }

    const createAccountUrl = "api/accounts/new/";
    const account = await axios.post(createAccountUrl, {
      username: this.state.email,
      password: this.state.password,
    });
    if (account.data.error) {
      alert(account.data.error);
    } else {
      this.props.accountCreated();
    }

    event.preventDefault();
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
