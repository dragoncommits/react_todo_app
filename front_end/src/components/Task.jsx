import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import TimeAgo from "timeago-react"; // var TimeAgo = require('timeago-react');
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TaskForm from "./TaskForm.jsx";
//https://github.com/hustcc/timeago-react
import "./Task.css";
import axios from "axios";

class Task extends Component {
  renderCheckBox() {
    //renders the checkbox to be a green check or red x depending on completed
    if (this.props.task.completed) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="green"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-square"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        </svg>
      );
    }
  }

  handleSave = (event) => {
    var id = this.props.task.id;
    var value = event.target.value;
    var updateTaskUrl = "/api/tasks/update/" + id + "/";
    axios.put(updateTaskUrl, {
      content: value,
    });
    this.props.handleSaveTask(id, value);
  };

  renderBadge() {
    var variant = "";
    if (this.props.theme == "dark") {
      variant = "secondary";
    } else {
      variant = "light";
    }

    //renders the time since ...
    if (this.props.task.completed) {
      return (
        <Badge pill variant={variant}>
          <span>completed </span>
          <TimeAgo datetime={this.props.task.completedTime} />
        </Badge>
      );
    }
    return (
      <Badge pill variant={variant}>
        <span>added </span>
        <TimeAgo datetime={this.props.task.created} />
      </Badge>
    );
  }

  render() {
    var cont_classes = "py-2 border-bottom position-relative ";
    if (this.props.task.completed) {
      cont_classes += "text-success";
    }

    if (!this.props.task.completed) {
      cont_classes += "text-danger";
    }

    return (
      <Container fluid className={cont_classes} data-id={this.props.task.id}>
        <Button
          variant="link"
          className="btn-sm text-secondary position-absolute delete-button-position-right"
          onClick={() => {
            this.props.handleDeleteTask(this.props.task.id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </Button>

        <div className="position-absolute badge-position-right">
          <div>{this.renderBadge()}</div>
        </div>
        <Row>
          <Col
            xs={1}
            onClick={() =>
              this.props.handleToggleTaskCompletion(this.props.task.id)
            }
          >
            {this.renderCheckBox()}
          </Col>
          <Col>
            <TaskForm
              content={this.props.task.content}
              completed={this.props.task.completed}
              handleSave={this.handleSave}
              theme={this.props.theme}
            ></TaskForm>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Task;
