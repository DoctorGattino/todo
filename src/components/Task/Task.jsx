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
  timeLeft,
  updateTimeLeft,
}) => {
  const [textTask, setTextTask] = useState(label)
  const intervalRef = useRef(null)
  const isTimerRunning = useRef(false)
  const timeLeftRef = useRef(timeLeft)

  // Синхронизируем ref с актуальным значением timeLeft из props
  useEffect(() => {
    timeLeftRef.current = timeLeft
  }, [timeLeft])

  // Инициализация textTask при монтировании и при изменении режима редактирования
  useEffect(() => {
    setTextTask(label)
  }, [label, editing])

  // Старт
  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    isTimerRunning.current = true
    intervalRef.current = setInterval(() => {
      const current = timeLeftRef.current
      if (current <= 1) {
        clearInterval(intervalRef.current)
        isTimerRunning.current = false
        updateTimeLeft(id, 0)
        onTimerEnd && onTimerEnd(id)
        return
      }
      updateTimeLeft(id, current - 1)
    }, 1000)
  }

  // Пауза
  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      isTimerRunning.current = false
    }
  }

  // Очистка интервала при размонтировании
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        isTimerRunning.current = false
      }
    }
  }, [])

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

  let classNames = ''
  if (completed) classNames += ' completed'
  if (editing) classNames += ' editing'

  const time = formatDistanceToNow(date, { includeSeconds: true })

  // Выход из режима редактирования по ESC или потере фокуса
  const handleEditKeyDown = (e) => {
    if (e.key === 'Escape') {
      setTextTask(label)
      onEditTask()
    }
  }
  const handleEditBlur = () => {
    onEditTask()
  }

  // Автофокус на инпут при открытии режима редактирования
  const editInputRef = useRef(null)
  useEffect(() => {
    if (editing && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editing])

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
        <input
          type="text"
          className="edit"
          value={textTask}
          ref={editInputRef}
          onChange={onTextChange}
          onKeyDown={handleEditKeyDown}
          onBlur={handleEditBlur}
        />
      </form>
    </li>
  )
}

export default Task
