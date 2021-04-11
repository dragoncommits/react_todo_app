import React, { Component } from "react";
import Task from "./Task.jsx";
import Dragula from "react-dragula";
import DragulaStyles from "react-dragula/dist/dragula.min.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
class List extends Component {
  dragulaDecorator = (componentBackingInstance) => {
    //method used by dragula to allow drag and drop functionality
    //when Task is dropped calles this.props.moveTask
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
        this.props.moveTask(element_id, sibling_id);
      });
    }
  };

  getStyles() {
    //styles of the containing ul element
    return { overflowY: "scroll", overflowX: "hidden" };
  }

  render() {
    return (
      <ul
        ref={this.dragulaDecorator}
        className="p-0 hide-native-scrollbar"
        style={this.getStyles()}
      >
        <TransitionGroup component={null}>
          {this.props.tasks.map((task) => (
            <CSSTransition key={task.id} timeout={250} classNames="task">
              <Task
                key={task.id}
                task={task}
                handleToggleTaskCompletion={
                  this.props.handleToggleTaskCompletion
                }
                handleSaveTask={this.props.handleSaveTask}
                theme={this.props.theme}
                handleDeleteTask={this.props.handleDeleteTask}
              ></Task>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    );
  }
}

export default List;
