import React from 'react'

import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  constructor() {
    super()

    this.state = {
      label: '',
      min: '',
      sec: '',
    }

    this.onInputChange = (event) => {
      const { name, value } = event.target
      this.setState({ [name]: value })
    }

    this.onSubmit = (event) => {
      event.preventDefault()
      const { label, min, sec } = this.state

      if (label.trim() && min.trim() && sec.trim()) {
        this.props.addItem({ label, min, sec })
        this.setState({ label: '', min: '', sec: '' })
      } else {
        alert('All fields must be filled')
      }
    }
  }

  render() {
    const { label, min, sec } = this.state
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          name="label"
          type="text"
          className="new-todo"
          onChange={this.onInputChange}
          placeholder="What needs to be done?"
          value={label}
          autoFocus
        />
        <input
          name="min"
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          autoComplete="off"
          onChange={this.onInputChange}
          value={min}
        />
        <input
          name="sec"
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          autoComplete="off"
          onChange={this.onInputChange}
          value={sec}
          min={0}
          max={60}
        />
        <button type="submit" />
      </form>
    )
  }
}
