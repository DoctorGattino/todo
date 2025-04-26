import React, { useState, useContext } from 'react'

import './NewTaskForm.css'
import TodoContext from '../../context/TodoContext'

const NewTaskForm = () => {
  const { addItem } = useContext(TodoContext)
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onInputChange = (event) => {
    const { name, value } = event.target
    if (name === 'label') {
      setLabel(value)
    } else if (name === 'min') {
      setMin(value)
    } else if (name === 'sec') {
      setSec(value)
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (label.trim() && min.trim() && sec.trim()) {
      addItem({ label, min, sec })
      setLabel('')
      setMin('')
      setSec('')
    } else {
      alert('All fields must be filled')
    }
  }

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        name="label"
        type="text"
        className="new-todo"
        onChange={onInputChange}
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
        onChange={onInputChange}
        value={min}
      />
      <input
        name="sec"
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        autoComplete="off"
        onChange={onInputChange}
        value={sec}
        min={0}
        max={60}
      />
      <button type="submit" />
    </form>
  )
}

export default NewTaskForm
