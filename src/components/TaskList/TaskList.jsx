import React from 'react'

import Task from '../Task'
import './TaskList.css'

const TaskList = ({
  todos,
  onDeleted,
  onToggleCompleted,
  onEditTask,
  onEditTaskChange,
  onTaskTimerState,
  onTimerStart,
  onTimerEnd,
  onChangeTimerState,
}) => {
  const elements = todos.map((item) => {
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
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onEditTask={() => onEditTask(id)}
          onEditTaskChange={onEditTaskChange}
          onTaskTimerState={onTaskTimerState}
          onTimerStart={() => onTimerStart(id)}
          onTimerEnd={onTimerEnd}
          onChangeTimerState={onChangeTimerState}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
