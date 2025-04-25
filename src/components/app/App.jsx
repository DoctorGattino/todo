import React from 'react'
import './App.css'

import Footer from '../Footer'
import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'

export default class App extends React.Component {
  constructor() {
    super()

    this.maxId = 100

    this.createTodoItem = ({ label, min = 0, sec = 0 }) => ({
      label,
      id: this.maxId++,
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
    })

    this.state = {
      todoData: [],
      filter: 'all', //active, all, completed
    }

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        /* const idx = todoData.findIndex((el) => el.id === id)
        const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)] */
        return {
          todoData: todoData.filter((el) => el.id !== id),
        }
      })
    }

    this.deleteAllCompleted = () => {
      this.setState(({ todoData }) => {
        const newArr = todoData.filter((el) => !el.completed)
        return { todoData: newArr }
      })
    }

    this.addItem = ({ label, min, sec }) => {
      const newItem = this.createTodoItem({ label, min, sec })
      this.setState(({ todoData }) => {
        return { todoData: [...todoData, newItem] }
      })
    }

    this.toggleProperty = (arr, id, propName) => {
      const idx = arr.findIndex((el) => el.id === id)
      const oldItem = arr[idx]
      const newItem = { ...oldItem, [propName]: !oldItem[propName] }
      return arr.toSpliced(idx, 1, newItem)
    }

    this.onToggleCompleted = (id) => {
      this.setState(({ todoData }) => {
        return { todoData: this.toggleProperty(todoData, id, 'completed') }
      })
    }

    this.editTask = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: todoData.map((task) => {
            return task.id === id ? { ...task, editing: !task.editing } : task
          }),
        }
      })
    }

    this.editTaskChange = (id, text) => {
      this.setState(({ todoData }) => ({
        todoData: todoData.map((task) => {
          return task.id === id ? { ...task, label: text, editing: !task.editing } : task
        }),
      }))
    }

    this.onFilterChange = (filter) => {
      this.setState({ filter })
    }

    this.filter = (items, filter) => {
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
    }

    this.taskTimerState = (min, sec, id) => {
      this.setState(({ todoData }) => {
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
        return {
          todoData: [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)],
        }
      })
    }

    this.timerStart = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldTask = todoData[idx]
        const newTask = { ...oldTask, timer: !oldTask.timer }
        return {
          todoData: [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)],
        }
      })
    }

    this.timerEnd = (id) => {
      this.setState(({ todoData }) => {
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
        return {
          todoData: [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)],
        }
      })
    }

    this.changeTimerState = ([minTens, min, secTens, sec, id]) => {
      const totalMin = minTens * 10 + min
      const totalSec = secTens * 10 + sec
      this.setState(({ todoData }) => {
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
        return {
          todoData: [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)],
        }
      })
    }
  }

  render() {
    const { todoData, filter } = this.state

    const visibleItems = this.filter(todoData, filter)

    const todoCount = todoData.filter((el) => !el.completed).length
    return (
      <section className="todoapp">
        <h1>todos</h1>
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onEditTask={this.editTask}
            onEditTaskChange={this.editTaskChange}
            onTaskTimerState={this.taskTimerState}
            onTimerStart={this.timerStart}
            onTimerEnd={this.timerEnd}
            onChangeTimerState={this.changeTimerState}
          />
          <Footer
            toDo={todoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            onClearTasks={this.deleteAllCompleted}
          />
        </section>
      </section>
    )
  }
}
//
