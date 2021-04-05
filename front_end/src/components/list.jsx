import React, { Component } from "react";
import Todo from "./todo.jsx";
import Dragula from "react-dragula";
import DragulaStyles from "react-dragula/dist/dragula.min.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
class List extends Component {
  dragulaDecorator = (componentBackingInstance) => {
    //method used by dragula to allow drag and drop functionality
    //when Todo is dropped calles this.props.moveTodo
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
        this.props.moveTodo(element_id, sibling_id);
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
          {this.props.tasks.map((todo) => (
            <CSSTransition key={todo.id} timeout={250} classNames="todo">
              <Todo
                key={todo.id}
                todo={todo}
                handleToggleTaskCompletion={
                  this.props.handleToggleTaskCompletion
                }
                handleSaveTask={this.props.handleSaveTask}
                theme={this.props.theme}
                handleDeleteTask={this.props.handleDeleteTask}
              ></Todo>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    );
  }
}

export default List;
