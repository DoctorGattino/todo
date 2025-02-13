import React from 'react'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import ItemAddForm from '../item-add-form/item-add-form'

export default class App extends React.Component {
  constructor() {
    super()

    this.maxId = 100

    this.createTodoItem = (label) => {
      return {
        label: label,
        important: false,
        done: false,
        id: this.maxId++,
      }
    }

    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch'),
      ],
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

    this.addItem = (text) => {
      const newItem = this.createTodoItem(text)
      this.setState(({ todoData }) => {
        return { todoData: [...todoData, newItem] }
      })
    }

    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        const newItem = { ...oldItem, done: !oldItem.done }
        return { todoData: todoData.toSpliced(idx, 1, newItem) }
      })
    }

    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        const newItem = { ...oldItem, important: !oldItem.important }
        return { todoData: todoData.toSpliced(idx, 1, newItem) }
      })
    }
  }

  render() {
    return (
      <div>
        <AppHeader toDo={1} done={3} />
        <div>
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={this.state.todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm addItem={this.addItem} />
      </div>
    )
  }
}
