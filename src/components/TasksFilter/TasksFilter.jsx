import React, { useContext } from 'react'

import './TasksFilter.css'
import TodoContext from '../../context/TodoContext'

const TasksFilter = () => {
  const { filter, onFilterChange } = useContext(TodoContext)

  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const renderedButtons = buttons.map(({ name, label }) => {
    const isActive = filter === name
    const clazz = isActive ? 'selected' : ''
    return (
      <li key={name}>
        <button type="button" className={`${clazz}`} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{renderedButtons}</ul>
}

export default TasksFilter
