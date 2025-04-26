import React, { useState, useRef, useCallback } from 'react'
import './App.css'

import Footer from '../Footer'
import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TodoContext from '../../context/TodoContext'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('all')
  const maxId = useRef(100)

  const createTodoItem = useCallback(
    ({ label, min = 0, sec = 0 }) => ({
      label,
      id: maxId.current++,
      completed: false,
      date: new Date(),
      editing: false,
      timer: false,
      minuteForTask: Number(min),
      seconds: Number(sec),
      minuteTens: '',
      minute: '',
      secondTens: '',
      second: '',
    }),
    []
  )

  const deleteItem = useCallback((id) => {
    setTodoData((todoData) => todoData.filter((el) => el.id !== id))
  }, [])

  const deleteAllCompleted = useCallback(() => {
    setTodoData((todoData) => todoData.filter((el) => !el.completed))
  }, [])

  const addItem = useCallback(
    ({ label, min, sec }) => {
      const newItem = createTodoItem({ label, min, sec })
      setTodoData((todoData) => [...todoData, newItem])
    },
    [createTodoItem]
  )

  const toggleProperty = useCallback((arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return arr.toSpliced(idx, 1, newItem)
  }, [])

  const onToggleCompleted = useCallback(
    (id) => {
      setTodoData((todoData) => toggleProperty(todoData, id, 'completed'))
    },
    [toggleProperty]
  )

  const editTask = useCallback((id) => {
    setTodoData((todoData) => todoData.map((task) => (task.id === id ? { ...task, editing: !task.editing } : task)))
  }, [])

  const editTaskChange = useCallback((id, text) => {
    setTodoData((todoData) =>
      todoData.map((task) => (task.id === id ? { ...task, label: text, editing: !task.editing } : task))
    )
  }, [])

  const onFilterChange = useCallback((filter) => {
    setFilter(filter)
  }, [])

  const filterItems = useCallback((items, filter) => {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.completed)
      case 'completed':
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }, [])

  const taskTimerState = useCallback((min, sec, id) => {
    setTodoData((todoData) => {
      const end = Date.now() + min * 60000 + sec * 1000
      const now = Date.now()
      const delta = end - now
      const idx = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[idx]
      const newTask = {
        ...oldTask,
        minuteTens: Math.floor(delta / 600000),
        minute: Math.floor((delta / 60000) % 10),
        secondTens: Math.floor((delta % 60000) / 10000),
        second: Math.floor(((delta % 60000) / 1000) % 10),
      }
      return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
    })
  }, [])

  const timerStart = useCallback((id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[idx]
      const newTask = { ...oldTask, timer: !oldTask.timer }
      return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
    })
  }, [])

  const timerEnd = useCallback((id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[idx]
      const newTask = {
        ...oldTask,
        minuteForTask: 0,
        seconds: 0,
        timer: false,
        minuteTens: 0,
        minute: 0,
        secondTens: 0,
        second: 0,
      }
      return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
    })
  }, [])

  const changeTimerState = useCallback(([minTens, min, secTens, sec, id]) => {
    const totalMin = minTens * 10 + min
    const totalSec = secTens * 10 + sec
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[idx]
      const newTask = {
        ...oldTask,
        minuteForTask: totalMin,
        seconds: totalSec,
        minuteTens: minTens,
        minute: min,
        secondTens: secTens,
        second: sec,
      }
      return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
    })
  }, [])

  const visibleItems = filterItems(todoData, filter)
  const todoCount = todoData.filter((el) => !el.completed).length

  const contextValue = {
    todoData,
    filter,
    visibleItems,
    todoCount,
    addItem,
    deleteItem,
    deleteAllCompleted,
    onToggleCompleted,
    editTask,
    editTaskChange,
    onFilterChange,
    taskTimerState,
    timerStart,
    timerEnd,
    changeTimerState,
  }

  return (
    <TodoContext.Provider value={contextValue}>
      <section className="todoapp">
        <h1>todos</h1>
        <NewTaskForm />
        <section className="main">
          <TaskList />
          <Footer />
        </section>
      </section>
    </TodoContext.Provider>
  )
}

export default App
//
