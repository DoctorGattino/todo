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

    this.taskTimerPlay = () => {
      const { id, minuteTens, minute, secondTens, second, onTimerEnd, onChangeTimerState } = this.props
      const totalSeconds = (minuteTens * 10 + minute) * 60 + (secondTens * 10 + second)
      const end = Date.now() + totalSeconds * 1000

      this.interval = setInterval(() => {
        const now = Date.now()
        const delta = end - now

        if (delta <= 0) {
          clearInterval(this.interval)
          onTimerEnd(id)
          return
        }

        const minTens = Math.floor(delta / 1000 / 60 / 10)
        const min = Math.floor((delta / 1000 / 60) % 10)
        const secTens = Math.floor((delta % 60000) / 10000)
        const sec = Math.floor(((delta % 60000) / 1000) % 10)

        onChangeTimerState([minTens, min, secTens, sec, id])
      }, 500)
    }

    this.timerStart = () => {
      const { id, timer, onTimerStart } = this.props
      if (timer) return
      onTimerStart(id)
      this.taskTimerPlay()
    }

    this.timerPause = () => {
      const { id, onTimerStart } = this.props
      clearInterval(this.interval)
      onTimerStart(id)
    }

    this.interval = null
  }

  componentDidMount() {
    const { onTaskTimerState, minuteForTask, secondsForTask, id } = this.props
    onTaskTimerState(minuteForTask, secondsForTask, id)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const {
      label,
      onDeleted,
      onEditTask,
      onToggleCompleted,
      editing,
      completed,
      date,
      minuteTens,
      minute,
      secondTens,
      second,
    } = this.props

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
          <input type="checkbox" className="toggle" checked={completed} onChange={onToggleCompleted} />
          <label>
            <span className="description" onClick={onToggleCompleted}>
              {label}
            </span>
            <span className="description span-data">
              <button className="icon icon-play" onClick={this.timerStart}></button>
              <button className="icon icon-pause" onClick={this.timerPause}></button>
              {minuteTens}
              {minute}:{secondTens}
              {second}
            </span>
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
