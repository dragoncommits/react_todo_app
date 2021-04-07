import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  async handleSubmit(event) {
    const createAccountUrl = "api/accounts/login/";
    const account = await axios.post(createAccountUrl, {
      username: this.state.email,
      password: this.state.password,
    });
    if (account.data.error) {
      alert(account.data.error);
    } else {
      this.props.accountLoggedIn();
    }

    event.preventDefault();
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="login">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={this.handleEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={this.handlePasswordChange}
          />
        </Form.Group>

        <p className="text-center">
          don't have an account?{" "}
          <a href="#" onClick={this.props.toggleForm}>
            create one
          </a>
        </p>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    );
  }
}

export default Login;
