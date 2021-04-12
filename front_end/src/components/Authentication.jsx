import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Collapse from "react-bootstrap/Collapse";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import axios from "axios";

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = { showing: true, form: "login" };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.handleClose();
  }

  async handleClose() {
    const logged_in = await axios.get("/api/accounts/loggedIn/");

    if (logged_in.data.logged_in) {
      this.setState({ showing: false, username: logged_in.data.username });
    } else {
      this.setState({ showing: true, username: null });
    }
  }

  async handleLogout() {
    var confirm = window.confirm("are you sure you want to log out?");
    if (confirm) {
      await axios.post("/api/accounts/logout/");

      this.handleClose();
    }
  }

  toggleForm() {
    if (this.state.form === "create") {
      this.setState({ form: "login" });
    } else {
      this.setState({ form: "create" });
    }
  }

  renderLoginForm() {
    return (
      <Login
        accountLoggedIn={this.handleClose}
        toggleForm={this.toggleForm}
      ></Login>
    );
  }

  renderCreateForm() {
    return (
      <CreateAccount
        accountCreated={this.handleClose}
        toggleForm={this.toggleForm}
      ></CreateAccount>
    );
  }

  renderCorrectForm() {
    if (this.state.form == "login") {
      return this.renderLoginForm();
    } else {
      return this.renderCreateForm();
    }
  }
  renderTitle() {
    if (this.state.form == "login") {
      return "Login";
    } else {
      return "Create Account";
    }
  }

  renderLoggedIn() {
    if (this.state.username) {
      var style = { position: "absolute", top: 5, left: 5 };
      return (
        <p style={style}>
          logged in as:{" "}
          <a href="#" onClick={this.handleLogout}>
            {this.state.username}
          </a>
        </p>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.renderLoggedIn()}
        <Modal
          centered
          show={this.state.showing}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>{this.renderTitle()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.renderCorrectForm()}</Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Authentication;
