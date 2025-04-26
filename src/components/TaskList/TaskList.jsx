import React, { useContext } from 'react'

import Task from '../Task'
import './TaskList.css'
import TodoContext from '../../context/TodoContext'

const TaskList = () => {
  const {
    visibleItems,
    deleteItem,
    onToggleCompleted,
    editTask,
    editTaskChange,
    taskTimerState,
    timerStart,
    timerEnd,
    changeTimerState,
  } = useContext(TodoContext)

  const elements = visibleItems.map((item) => {
    const {
      id,
      completed,
      date,
      editing,
      minuteForTask,
      seconds,
      minuteTens,
      minute,
      secondTens,
      second,
      timer,
      nameTask,
      ...itemProps
    } = item

    return (
      <li key={id} className="list-group-item">
        <Task
          nameTask={nameTask}
          completed={completed}
          date={date}
          editing={editing}
          id={id}
          minuteForTask={minuteForTask}
          secondsForTask={seconds}
          minuteTens={minuteTens}
          minute={minute}
          secondTens={secondTens}
          second={second}
          timer={timer}
          {...itemProps}
          onDeleted={() => deleteItem(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onEditTask={() => editTask(id)}
          onEditTaskChange={editTaskChange}
          onTaskTimerState={taskTimerState}
          onTimerStart={() => timerStart(id)}
          onTimerEnd={timerEnd}
          onChangeTimerState={changeTimerState}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
