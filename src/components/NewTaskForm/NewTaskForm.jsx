import React from 'react'

import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  constructor() {
    super()

    this.state = {
      label: '',
    }

    this.onLabelChange = (event) => {
      this.setState({ label: event.target.value })
    }

    this.onSubmit = (event) => {
      event.preventDefault()
      if (this.state.label.length !== 0) {
        this.props.addItem(this.state.label)
      } else {
        alert('The line must not be empty')
      }
      this.setState({ label: '' })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          value={this.state.label}
          autoFocus
        />
      </form>
    )
  }
}
