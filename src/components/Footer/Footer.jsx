import React, { useContext } from 'react'
import './Footer.css'

import TasksFilter from '../TasksFilter'
import TodoContext from '../../context/TodoContext'

const Footer = () => {
  const { todoCount, deleteAllCompleted } = useContext(TodoContext)

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter />
      <button className="clear-completed" onClick={deleteAllCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
