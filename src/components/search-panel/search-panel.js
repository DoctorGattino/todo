import React from 'react'

export default class SearchPanel extends React.Component {
  constructor() {
    super()

    this.state = {
      term: '',
    }

    this.onSearchChange = (event) => {
      const term = event.target.value
      this.setState({ term })
      this.props.onSearchChange(term)
    }
  }

  render() {
    return <input type="text" placeholder="search" value={this.state.term} onChange={this.onSearchChange} />
  }
}
