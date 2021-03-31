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
    if (event.target.value.trim().length === 0) {
      this.setState({ mode: "error" });
    } else {
      this.setState({ mode: "view" });
      this.props.handleSave(event);
    }
  }

  handleCheckError(event) {
    if (event.target.value.trim().length === 0) {
      this.setState({ field_classes: "is-invalid" });
    } else {
      this.setState({ field_classes: "is-valid" });
    }
  }
  getViewClassNames() {
    if (this.props.completed) {
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
