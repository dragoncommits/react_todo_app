import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Collapse from "react-bootstrap/Collapse";
import Col from "react-bootstrap/Col";
import "./todoList.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import List from "./list.jsx";
import { Resizable } from "re-resizable";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
    this.handleToggleTaskCompletion = this.handleToggleTaskCompletion.bind(
      this
    );
    this.moveTodo = this.moveTodo.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);
    this.handleAddNewTask = this.handleAddNewTask.bind(this);
    this.handleRemoveCompletedTasks = this.handleRemoveCompletedTasks.bind(
      this
    );
  }

  handleToggleTaskCompletion(id) {
    var tasks_clone = [...this.state.todos];

    for (var key in tasks_clone) {
      if (tasks_clone[key].id === id) {
        tasks_clone[key].completed = !tasks_clone[key].completed;
        if (tasks_clone[key].completed) {
          tasks_clone[key].completedTime = new Date().toLocaleString();
        }
      }
    }
    this.setState({ todos: tasks_clone });
  }

  handleSaveTask(id, value) {
    var tasks_clone = [...this.state.todos];

    for (var key in tasks_clone) {
      if (tasks_clone[key].id === id) {
        tasks_clone[key].content = value;
      }
    }
    this.setState({ todos: tasks_clone });
  }

  handleAddNewTask() {
    var tasks_clone = [...this.state.todos];
    var newId = tasks_clone.length + 1;

    var newTaskContent = prompt("enter a task");

    var todoTask = {
      updated: new Date().toLocaleString(),
      content: newTaskContent,
      completed: false,

      id: newId,
    };

    if (newTaskContent) {
      tasks_clone.push(todoTask);

      this.setState({ todos: tasks_clone });
    }
  }

  handleRemoveCompletedTasks() {
    var confirmed = window.confirm(
      "Are you sure you want to permenently delete all completed tasks? this action cannot be undone"
    );
    if (confirmed) {
      var tasks_clone = [...this.state.todos];
      var tasks_clone = tasks_clone.filter(function (value, index, arr) {
        return value.completed !== true;
      });

      this.setState({ todos: tasks_clone });
    }
  }

  moveTodo(element_id, sibling_id) {
    var tasks_clone = [...this.state.todos];
    var todoTask = {};
    for (let i in tasks_clone) {
      var task = tasks_clone[i];

      if (task) {
        if (task.id == element_id) {
          todoTask = tasks_clone[i];
          tasks_clone = tasks_clone.filter(function (value, index, arr) {
            return value !== todoTask;
          });
        }
      }
    }
    if (sibling_id) {
      for (let i in tasks_clone) {
        if (tasks_clone[i].id == sibling_id) {
          tasks_clone.splice(i, 0, todoTask);
          break;
        }
      }
    } else {
      tasks_clone.push(todoTask);
    }

    this.setState({ todos: tasks_clone });
  }

  getCompletedTasks() {
    console.log("this", this);
    var tasks_clone = [...this.state.todos];
    var completedTasks = tasks_clone.filter(function (value, index, arr) {
      return value.completed == true;
    });
    return completedTasks;
  }

  getUncompletedTasks() {
    var tasks_clone = [...this.state.todos];
    var uncompletedTasks = tasks_clone.filter(function (value, index, arr) {
      return value.completed !== true;
    });
    return uncompletedTasks;
  }

  renderTasksLeftText() {
    var tasks_clone = [...this.state.todos];
    var uncompletedTasks = this.getUncompletedTasks();
    var uncompletelength = uncompletedTasks.length;
    if (uncompletelength === 0) {
      return "no tasks left. you are all caught up!!!";
    } else if (uncompletelength === 1) {
      return uncompletelength + " more left!";
    } else {
      return uncompletelength + " left";
    }
  }

  renderCompletedTasks() {
    var completedTasks = this.getCompletedTasks();
    var completedTasksLength = this.getCompletedTasks().length;
    var taskCompleteText = "";
    if (completedTasksLength === 1) {
      taskCompleteText = completedTasksLength + " task complete!";
    } else {
      taskCompleteText = completedTasksLength + " tasks completed!";
    }

    var tasks_open = completedTasks.length > 0;

    return (
      <Collapse in={tasks_open}>
        <div className="footer fixed-bottom bg-dark">
          <Resizable
            defaultSize={{
              width: "100%",
              height: 300,
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
                <Button variant="link" className="text-muted" disabled>
                  {taskCompleteText}
                </Button>
              </Col>
              <Col className="text-center">
                <Button
                  variant="link"
                  className="text-danger"
                  onClick={this.handleRemoveCompletedTasks}
                >
                  delete completed
                </Button>
              </Col>
            </Row>
            <List
              tasks={completedTasks}
              handleToggleTaskCompletion={this.handleToggleTaskCompletion}
              handleSaveTask={this.handleSaveTask}
              moveTodo={this.moveTodo}
              theme="dark"
              maxHeight={500}
            ></List>
          </Resizable>
        </div>
      </Collapse>
    );
  }

  renderWhenTodos() {
    var uncompletedTasks = this.getUncompletedTasks();

    return (
      <div>
        <div className="bg-white pb-4 rounded-bottom">
          <h4 className="text-center mt-3">Tasks</h4>
          <p className="text-center text-muted">{this.renderTasksLeftText()}</p>
          <List
            tasks={uncompletedTasks}
            handleToggleTaskCompletion={this.handleToggleTaskCompletion}
            handleSaveTask={this.handleSaveTask}
            moveTodo={this.moveTodo}
            theme="light"
          ></List>

          <Button
            autoFocus
            variant="outline-success"
            className="w-100 btn-sm"
            onClick={this.handleAddNewTask}
          >
            add new task
          </Button>
        </div>
        {this.renderCompletedTasks()}
      </div>
    );
  }

  renderWhenNoTodos() {
    return (
      <div className="center-items">
        <div>
          <h1 className="pb-5">you have no tasks</h1>

          <Button
            autoFocus
            variant="success"
            className="w-100 btn-lg"
            onClick={this.handleAddNewTask}
          >
            add task
          </Button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <CSSTransition
          in={this.state.todos.length}
          timeout={600}
          classNames="fade"
          unmountOnExit
          appear
        >
          {this.renderWhenTodos()}
        </CSSTransition>
        <CSSTransition
          in={!this.state.todos.length}
          timeout={600}
          classNames="fade"
          unmountOnExit
          appear
        >
          {this.renderWhenNoTodos()}
        </CSSTransition>
      </div>
    );
  }
}

export default TodoList;
