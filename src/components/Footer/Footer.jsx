import React from 'react'
import './Footer.css'

import TasksFilter from '../TasksFilter'

const AppHeader = ({ toDo, onFilterChange, filter, onClearTasks }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearTasks}>
        Clear completed
      </button>
    </footer>
  )
}

export default AppHeader
