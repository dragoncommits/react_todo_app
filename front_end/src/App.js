import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { CSSTransition } from "react-transition-group";
import List from "./components/List.jsx";
import CompletedList from "./components/CompletedList";
import Authentication from "./components/Authentication.jsx"
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
    this.handleToggleTaskCompletion = this.handleToggleTaskCompletion.bind(
      this
    );
    this.moveTask = this.moveTask.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);
    this.handleAddNewTask = this.handleAddNewTask.bind(this);
    this.handleRemoveCompletedTasks = this.handleRemoveCompletedTasks.bind(
      this
    );
    this.handleDeleteTask = this.handleDeleteTask.bind(this)
  }

  async componentDidMount() {
    var getTasksUrl = '/api/tasks/list/'
    const tasks = await axios.get(getTasksUrl);

    this.setState({tasks:tasks.data})
  }

  async handleToggleTaskCompletion(id) {
    /*
      excepts task_id

      handler for when a task is toggled(checkbox clicked)
      toggles task completed
      if completed sets completed time to current
    */
    var tasks_clone = [...this.state.tasks];
    var updateTaskUrl = "/api/tasks/update/" + id + "/";

    for (var key in tasks_clone) {
      if (tasks_clone[key].id === id) {
        tasks_clone[key].completed = !tasks_clone[key].completed;
        if (tasks_clone[key].completed) {
          var completedTime=new Date().toJSON()
          tasks_clone[key].completedTime =completedTime;
          var task = await axios.patch(updateTaskUrl, {
            completedTime: completedTime,
            completed:true
          });
        }else{
          var task = await axios.patch(updateTaskUrl, {
            completed:false
          });
        }
      }
      console.log(task)
    }
    this.setState({ tasks: tasks_clone });
  }

  handleSaveTask(id, value) {
    /*
      excepts task id and new value
      handler for when a task is updated with new text
    */
    var tasks_clone = [...this.state.tasks];

    for (var key in tasks_clone) {
      if (tasks_clone[key].id === id) {
        tasks_clone[key].content = value;
      }
    }
    this.setState({ tasks: tasks_clone });
  }

  async handleAddNewTask() {
    /*
     adds a new task to state.tasks
    */

    // get task content
    var newTaskContent = prompt("enter a task");

    //create task
    var createTaskUrl = '/api/tasks/create/'
    const task = await axios.post(createTaskUrl, {
      content:newTaskContent
    });

    var tasks_clone = [...this.state.tasks];


    //add task to state
    var newTask = {
      created: task.data.created,
      content: task.data.content,
      completed: task.data.completed,
      id: task.data.id,
    };

    if (newTaskContent) {
      tasks_clone.push(newTask);

      this.setState({ tasks: tasks_clone });
    }
  }

  async handleDeleteTask(id){
    //removes task by id
    var confirmed = window.confirm(
      "Are you sure you want to permenently delete this task?"
    );
    if (confirmed) {

      var deleteTaskUrl = '/api/tasks/delete/'+id+'/';
      const task = await axios.delete(deleteTaskUrl);


      var tasks_clone = [...this.state.tasks];
      tasks_clone = tasks_clone.filter(function (value, index, arr) {
        return value.id !== id;
      });

      this.setState({ tasks: tasks_clone });
    }
  }

  async handleRemoveCompletedTasks() {
    //removes all completed tasks from state after user comfirms to delete them
    var confirmed = window.confirm(
      "Are you sure you want to permenently delete all completed tasks? this action cannot be undone"
    );
    if (confirmed) {
      var tasks_clone = [...this.state.tasks];
      tasks_clone = tasks_clone.filter(function (value, index, arr) {
        return value.completed !== true;
      });

      const deleteCompletedUrl = '/api/tasks/delete/completed/'
      const deleteCompletedTasks = await axios.delete(deleteCompletedUrl);

      this.setState({ tasks: tasks_clone });
    }
  }

  async moveTask(element_id, sibling_id) {
    //moves a task element by its id before another sibling element in the same list 
    //if sibling element is null moves element to the end
    var tasks_clone = [...this.state.tasks];
    var newTask = {};

    //finds element and removes it from task clone
    //sets it as the newTask (to be used by the next block of code)
    for (let i in tasks_clone) {
      var task = tasks_clone[i];

      if (task.id == element_id) {
        newTask = tasks_clone[i];
        tasks_clone = tasks_clone.filter(function (value, index, arr) {
          return value !== newTask;
        });
        break;
      }
    }

    //if putting newTask not at the end
    if (sibling_id) {
      for (let i in tasks_clone) {
        if (tasks_clone[i].id == sibling_id) {
          tasks_clone.splice(i, 0, newTask);
          break;
        }
      }
    } else {
      //place newTask at the end
      tasks_clone.push(newTask);
    }

    //move task in backend
    const reorderUrl = '/api/tasks/reorder/'
    const reorderedtasks = await axios.post(reorderUrl,tasks_clone);


    this.setState({ tasks: tasks_clone });
  }

  getCompletedTasks() {
    //returns a filtered list of all the completed tasks

    var tasks_clone = [...this.state.tasks];
    var completedTasks = tasks_clone.filter(function (value, index, arr) {
      return value.completed === true;
    });
    return completedTasks;
  }

  getUncompletedTasks() {
    //returns a filtered list of all uncompleted tasks

    var tasks_clone = [...this.state.tasks];
    var uncompletedTasks = tasks_clone.filter(function (value, index, arr) {
      return value.completed !== true;
    });
    return uncompletedTasks;
  }

  renderTasksLeftText() {
    //returns string of how many tasks are left to complete

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

  renderWhenTasks() {
    // main render method when there are any tasks
    var uncompletedTasks = this.getUncompletedTasks();
    return (
      <div >
        <div className="bg-white pb-4 rounded-bottom">
          <h4 className="text-center mt-3">Tasks</h4>
          <p className="text-center text-muted">{this.renderTasksLeftText()}</p>
          <List
            tasks={uncompletedTasks}
            handleToggleTaskCompletion={this.handleToggleTaskCompletion}
            handleSaveTask={this.handleSaveTask}
            handleDeleteTask = {this.handleDeleteTask}
            moveTask={this.moveTask}
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
          moveTask={this.moveTask}
          handleSaveTask={this.handleSaveTask}
          handleToggleTaskCompletion={this.handleToggleTaskCompletion}
          handleRemoveCompletedTasks={this.handleRemoveCompletedTasks}
          tasks={this.getCompletedTasks()}
          handleDeleteTask = {this.handleDeleteTask}
        ></CompletedList>
      </div>
    );
  }

  renderWhenNoTasks() {
    // render method when there are no tasks
    
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
        <Authentication></Authentication>
        <CSSTransition
          in={this.state.tasks.length}
          timeout={600}
          classNames="fade"
          unmountOnExit
          appear
        >
          {this.renderWhenTasks()}
        </CSSTransition>
        <CSSTransition
          in={!this.state.tasks.length}
          timeout={600}
          classNames="fade"
          unmountOnExit
          appear
        >
          {this.renderWhenNoTasks()}
        </CSSTransition>
        
      </div>
    );
  }
}

export default App;
