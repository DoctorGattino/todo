import React from 'react'

import Task from '../Task'
import './TaskList.css'

/*       <li>
<TodoListItem label={item.label} important={item.important} />
</li> */

const TaskList = ({ todos, onDeleted, onToggleCompleted, onEditTask, onEditTaskChange }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <li key={id} className="list-group-item">
        <Task
          {...itemProps}
          id={id}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onEditTask={() => onEditTask(id)}
          onEditTaskChange={onEditTaskChange}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
