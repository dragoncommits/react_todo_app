import React, { Component } from "react";
import Todo from "./todo.jsx";
import Dragula from "react-dragula";
import DragulaStyles from "react-dragula/dist/dragula.min.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Collapse from "react-bootstrap/Collapse";
import "./todoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.handleToggleTaskCompletion = this.handleToggleTaskCompletion.bind(
      this
    );

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

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {};
      var drag = Dragula([componentBackingInstance], options);
      drag.on("drop", (el, target, source, sibling) => {
        if (sibling) {
          var sibling_id = sibling.dataset.id;
        } else {
          var sibling_id = null;
        }
        var element_id = el.dataset.id;
        this.moveTodo(element_id, sibling_id);
      });
    }
  };

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
    var shownCompletedTasks = completedTasks.slice(0, 5);
    const ListOfCompletedTodos = () => (
      <ul ref={this.dragulaDecorator} className="p-0 mb-2">
        {shownCompletedTasks.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            handleToggleTaskCompletion={this.handleToggleTaskCompletion}
            handleSaveTask={this.handleSaveTask}
          ></Todo>
        ))}
      </ul>
    );

    var taskCompleteText = "";
    if (completedTasksLength === 1) {
      taskCompleteText = completedTasksLength + " task complete!";
    } else {
      taskCompleteText = completedTasksLength + " tasks completed!";
    }

    var tasks_open = completedTasks.length > 0;

    return (
      <Collapse in={tasks_open}>
        <div className="fixed-bottom bg-dark rounded-top">
          <h4 className="text-center text-light mt-3 mb-3">completed today!</h4>
          <ListOfCompletedTodos></ListOfCompletedTodos>
          <p className="text-muted">
            {taskCompleteText}{" "}
            <Button
              variant="link"
              className="text-danger"
              onClick={this.handleRemoveCompletedTasks}
            >
              delete completed
            </Button>
          </p>
        </div>
      </Collapse>
    );
  }

  render() {
    var uncompletedTasks = this.getUncompletedTasks();
    const ListOfTodos = () => (
      <ul ref={this.dragulaDecorator} className="p-0 mb-2">
        {uncompletedTasks.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            handleToggleTaskCompletion={this.handleToggleTaskCompletion}
            handleSaveTask={this.handleSaveTask}
          ></Todo>
        ))}
      </ul>
    );
    if (this.state.todos.length > 0) {
      return (
        <div>
          <div>
            <h4 className="text-center mt-3">Tasks</h4>
            <p className="text-center text-muted">
              {this.renderTasksLeftText()}
            </p>
            <ListOfTodos></ListOfTodos>
          </div>

          <div className="">
            <Button
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
    } else {
      return (
        <div className="center-items">
          <div>
            <h1 className="pb-5">you have no tasks</h1>
            <Button
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
  }
}

export default TodoList;
