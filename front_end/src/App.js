import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { CSSTransition } from "react-transition-group";
import List from "./components/list.jsx";
import CompletedList from "./components/completedList";

class App extends Component {
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
      tasks_clone = tasks_clone.filter(function (value, index, arr) {
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

      if (task.id == element_id) {
        todoTask = tasks_clone[i];
        tasks_clone = tasks_clone.filter(function (value, index, arr) {
          return value !== todoTask;
        });
        break;
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
      return value.completed === true;
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
        <CompletedList
          moveTodo={this.moveTodo}
          handleSaveTask={this.handleSaveTask}
          handleToggleTaskCompletion={this.handleToggleTaskCompletion}
          handleRemoveCompletedTasks={this.handleRemoveCompletedTasks}
          tasks={this.getCompletedTasks()}
        ></CompletedList>
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

export default App;
