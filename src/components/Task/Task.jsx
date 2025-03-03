import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

export default class Task extends React.Component {
  constructor() {
    super()
    this.state = { textTask: '' }

    this.onTextChange = (event) => {
      this.setState({ textTask: event.target.value })
    }

    this.onEditing = (evt) => {
      evt.preventDefault()
      const { onEditTaskChange, id } = this.props
      const text = this.state.textTask
      if (!text.trim()) {
        alert('Write something')
      } else {
        onEditTaskChange(id, text)
      }
    }
  }

  render() {
    const { label, onDeleted, onEditTask, onToggleCompleted, editing, completed, date } = this.props

    let classNames = ''

    const time = formatDistanceToNow(date, { includeSeconds: true })

    if (completed) {
      classNames += ' completed'
    }

    if (editing) {
      classNames += ' editing'
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input type="checkbox" checked={completed} className="toggle" onClick={onToggleCompleted} />
          <label>
            <span className="description">{label}</span>
            <span className="created">created {time} ago</span>
          </label>
          <button className="icon icon-edit" onClick={onEditTask}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onEditing}>
          <input type="text" className="edit" placeholder={label} autoFocus onChange={this.onTextChange} />
        </form>
      </li>
    )
  }
}
