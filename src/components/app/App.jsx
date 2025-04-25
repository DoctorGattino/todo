import React from 'react'
import './App.css'

import Footer from '../Footer'
import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'

export default class App extends React.Component {
  constructor() {
    super()

    this.maxId = 100

    this.createTodoItem = (label) => {
      return {
        label: label,
        completed: false,
        id: this.maxId++,
        date: new Date(),
        editing: false,
      }
    }

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

    this.addItem = (text) => {
      const newItem = this.createTodoItem(text)
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
