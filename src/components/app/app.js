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

    this.state = {
      todoData: [
        { label: 'Drink Coffee', important: false, id: 1 },
        { label: 'Make Awesome App', important: true, id: 2 },
        { label: 'Have a lunch', important: false, id: 3 },
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
      const newItem = {
        label: text,
        important: false,
        id: this.maxId++,
      }
      this.setState(({ todoData }) => {
        return { todoData: [...todoData, newItem] }
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
        <TodoList todos={this.state.todoData} onDeleted={this.deleteItem} />
        <ItemAddForm addItem={this.addItem} />
      </div>
    )
  }
}
