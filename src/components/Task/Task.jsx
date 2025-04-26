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
  id,
  onEditTaskChange,
  onTimerEnd,
  minuteForTask,
  secondsForTask,
}) => {
  const [textTask, setTextTask] = useState('')
  // Новый таймер: только секунды
  const initialSeconds = (minuteForTask || 0) * 60 + (secondsForTask || 0)
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
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

  // Форматирование времени
  function formatTime(sec) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Старт
  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          onTimerEnd && onTimerEnd(id)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Пауза
  const pauseTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  // Очистка интервала при размонтировании
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  let classNames = ''
  if (completed) classNames += ' completed'
  if (editing) classNames += ' editing'

  const time = formatDistanceToNow(date, { includeSeconds: true })

  return (
    <li className={classNames}>
      <div className="view">
        <input type="checkbox" className="toggle" checked={completed} onChange={onToggleCompleted} />
        <label>
          <span className="description" onClick={onToggleCompleted}>
            {label}
          </span>
          <span className="description span-data">
            <button className="icon icon-play" onClick={startTimer}></button>
            <button className="icon icon-pause" onClick={pauseTimer}></button>
            {formatTime(timeLeft)}
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
