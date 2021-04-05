import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: "view", field_classes: null };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCheckError = this.handleCheckError.bind(this);
  }

  handleEdit() {
    this.setState({ mode: "edit" });
  }

  handleSave(event) {
    //when onBlur event if there are no errors calles this.props.handleSave
    if (event.target.value.trim().length === 0) {
      this.setState({ mode: "error" });
    } else {
      this.setState({ mode: "view" });
      this.props.handleSave(event);
    }
  }

  handleCheckError(event) {
    //every keypress checks for errors and add the appropriate classes
    if (event.target.value.trim().length === 0) {
      this.setState({ field_classes: "is-invalid" });
    } else {
      this.setState({ field_classes: "is-valid" });
    }
  }
  getViewClassNames() {
    //changes highlighted text to be dark or white depending on the props theme
    if (this.props.theme === "dark") {
      return "bg-dark";
    }
    return "bg-white";
  }

  render() {
    var mode = this.state.mode;
    if (mode === "view") {
      return (
        <div className="p-1 my-1 pr-2" onClick={this.handleEdit}>
          <span className={this.getViewClassNames()}>{this.props.content}</span>
        </div>
      );
    } else if (mode === "edit") {
      return (
        <Form.Control
          onBlur={this.handleSave}
          type="text"
          placeholder="Add Todo"
          onChange={this.handleCheckError}
          className={this.state.field_classes}
          defaultValue={this.props.content}
        />
      );
    }
  }
}

export default TodoForm;
