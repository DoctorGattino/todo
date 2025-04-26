import React, { useState, useEffect, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

const Task = ({
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
  id,
  onEditTaskChange,
  onTaskTimerState,
  onTimerStart,
  onTimerEnd,
  onChangeTimerState,
  minuteForTask,
  secondsForTask,
}) => {
  const [textTask, setTextTask] = useState('')
  const intervalRef = useRef(null)

  const onTextChange = (event) => {
    setTextTask(event.target.value)
  }

  const onEditing = (evt) => {
    evt.preventDefault()
    if (!textTask.trim()) {
      alert('Write something')
    } else {
      onEditTaskChange(id, textTask)
    }
  }

  const taskTimerPlay = () => {
    const totalSeconds = (minuteTens * 10 + minute) * 60 + (secondTens * 10 + second)
    const end = Date.now() + totalSeconds * 1000

    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const delta = end - now

      if (delta <= 0) {
        clearInterval(intervalRef.current)
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

  const timerStart = () => {
    onTimerStart(id)
    taskTimerPlay()
  }

  const timerPause = () => {
    clearInterval(intervalRef.current)
    onTimerStart(id)
  }

  // Имитация componentDidMount
  useEffect(() => {
    // Инициализация таймера при монтировании компонента
    if (onTaskTimerState && minuteForTask !== undefined && secondsForTask !== undefined) {
      onTaskTimerState(minuteForTask, secondsForTask, id)
    }
  }, [])

  // Имитация componentWillUnmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

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
            <button className="icon icon-play" onClick={timerStart}></button>
            <button className="icon icon-pause" onClick={timerPause}></button>
            {minuteTens}
            {minute}:{secondTens}
            {second}
          </span>
          <span className="created">created {time} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEditTask}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form onSubmit={onEditing}>
        <input type="text" className="edit" placeholder={label} autoFocus onChange={onTextChange} />
      </form>
    </li>
  )
}

export default Task
