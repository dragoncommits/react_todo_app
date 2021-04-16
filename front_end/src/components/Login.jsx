import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/alert";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.renderPasswordErrors = this.renderPasswordErrors.bind(this);
    this.renderUsernameErrors = this.renderUsernameErrors.bind(this);
    this.renderFormErrors = this.renderFormErrors.bind(this);
  }

  async handleSubmit(event) {
    const createAccountUrl = "api/accounts/login/";
    const account = await axios.post(createAccountUrl, {
      username: this.state.email,
      password: this.state.password,
    });

    //if there are no errors in the account creation form
    console.log(account.data);
    if (account.status == 200 && account.data.success==true) {
      
        this.props.accountLoggedIn();
        return 0;
    }
    
    //parse the errors from the form into json
    var account_data = JSON.parse(account.data);

  //if there are nonfield errors  
  if (account_data.__all__) {
    //add each error to messages and add them to state
    var messages = [];
    for (var message in account_data.__all__) {
      messages.push(account_data.__all__[message]);
    }
    this.setState({ formErrors: messages });
  } else {
    //if no nonfield errors set state to none
    this.setState({ formErrors: [] });
  }

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
    if (account_data.password) {
      //add each error to messages and add them to state
      var messages = [];
      for (var message in account_data.password) {
        var m = account_data.password[message];
        messages = messages.concat(m);
      }
      this.setState({
        passwordError: messages,
      });
    } else {
      //if no password errors set state to none
      this.setState({
        passwordError: [],
      });
    }

    event.preventDefault();
  }

  handleUserNameChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
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

  renderFormErrors() {
    //renders all non field errors if there are any
    if (!this.state.formErrors||this.state.formErrors=={}) {
      return null;
    }else{
      var error = this.state.formErrors.map(function (message) {
        return (<Alert variant="danger">
                {message.message}
                </Alert>);
      });
  
      return error;
    }
    
  }

  renderPasswordErrors() {
    //renders all password errors if there are any
    if (!this.state.passwordError) {
      return null;
    }
    var error = this.state.passwordError.map(function (message) {
      return <Form.Text className="text-danger">{message.message}</Form.Text>;
    });
    return error;
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>

        {this.renderFormErrors()}
        <Form.Group controlId="login">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Enter Username"
            onChange={this.handleUserNameChange}
          />
          {this.renderUsernameErrors()}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={this.handlePasswordChange}
          />
          {this.renderPasswordErrors()}
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
