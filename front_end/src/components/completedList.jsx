import React, { Component } from "react";
import Collapse from "react-bootstrap/Collapse";
import Row from "react-bootstrap/Row";
import { Resizable } from "re-resizable";
import Col from "react-bootstrap/Col";
import List from "./list.jsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
class CompletedList extends Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
    this.toggleShowCompletedTasksPopup = this.toggleShowCompletedTasksPopup.bind(
      this
    );
  }

  getCompletedText() {
    //returns string of how many tasks completed
    var completedTasksLength = this.props.tasks.length;
    var taskCompleteText = "";
    if (completedTasksLength === 1) {
      taskCompleteText = completedTasksLength + " task complete!";
    } else {
      taskCompleteText = completedTasksLength + " tasks completed!";
    }

    return taskCompleteText;
  }

  getShowModal() {
    if (this.state.showPopup) {
      if (this.props.tasks.length <= 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  toggleShowCompletedTasksPopup() {
    this.setState({ showPopup: !this.state.showPopup });
  }

  render() {
    return (
      <div>
        <Collapse in={this.props.tasks.length > 0}>
          <div className="footer fixed-bottom bg-dark">
            <Resizable
              defaultSize={{
                width: "100%",
                height: 120,
              }}
              maxHeight={"95vh"}
              minHeight={"30px"}
              maxWidth={"100vw"}
              minWidth={"100vw"}
            >
              <p className="text-center text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrows-expand"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10z"
                  />
                </svg>
              </p>

              <h4 className="text-center text-light mt-3 mb-0">
                completed today!
              </h4>
              <Row>
                <Col className="text-center">
                  <Button
                    variant="link"
                    className="text-muted"
                    onClick={this.toggleShowCompletedTasksPopup}
                  >
                    {this.getCompletedText()}
                  </Button>
                </Col>
                <Col className="text-center">
                  <Button
                    variant="link"
                    className="text-danger"
                    onClick={this.props.handleRemoveCompletedTasks}
                  >
                    delete completed
                  </Button>
                </Col>
              </Row>
              <List
                tasks={this.props.tasks}
                handleToggleTaskCompletion={
                  this.props.handleToggleTaskCompletion
                }
                handleSaveTask={this.props.handleSaveTask}
                moveTodo={this.props.moveTodo}
                theme="dark"
                maxHeight={500}
                handleDeleteTask={this.props.handleDeleteTask}
              ></List>
            </Resizable>
          </div>
        </Collapse>
        <Modal
          contentClassName="modal-fullscreen-sm-down"
          scrollable={true}
          show={this.getShowModal()}
          onHide={this.toggleShowCompletedTasksPopup}
        >
          <Modal.Header closeButton>
            <Modal.Title>Completed Tasks</Modal.Title>
          </Modal.Header>
          <Modal.Header>{this.getCompletedText()}</Modal.Header>
          <Modal.Body>
            <List
              tasks={this.props.tasks}
              handleToggleTaskCompletion={this.props.handleToggleTaskCompletion}
              handleSaveTask={this.props.handleSaveTask}
              moveTodo={this.props.moveTodo}
              handleDeleteTask={this.props.handleDeleteTask}
            ></List>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.toggleShowCompletedTasksPopup}
            >
              Close
            </Button>
            <Button
              variant="danger"
              onClick={this.props.handleRemoveCompletedTasks}
            >
              Delete Completed
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CompletedList;
