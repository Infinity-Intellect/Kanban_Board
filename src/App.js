import React, { Component } from 'react'
import Column from "./components/Column"
import Header from "./components/Header"
import "./App.css"
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTaskId: 0,
      columns: [
        {
          columnId: 0,
          cards: [],
          columnTitle: "To do"
        },
        {
          columnId: 1,
          cards: [],
          columnTitle: "Doing"
        },
        {
          columnId: 2,
          cards: [],
          columnTitle: "Done"
        }
      ]
    }
  }
  addCard = (newCard, columnId) => {
    if (newCard.taskId === undefined) {
      const currentTaskId = this.state.currentTaskId
      newCard.taskId = this.state.currentTaskId
      this.setState({ currentTaskId: currentTaskId + 1 })
    }
    let columns = this.state.columns
    columns[columnId].cards.push(newCard)
    this.setState({ columns: columns })
  }
  removeCard = (taskId, columnId) => {
    let cards = this.state.columns[columnId].cards
    cards = cards.filter(card => {
      return card.taskId !== taskId
    })
    let columns = this.state.columns
    columns[columnId].cards = cards
    this.setState({ columns: columns })
  }
  reassignCard = (taskId, columnId, direction) => {
    const card = this.state.columns[columnId].cards.filter(card => {
      return card.taskId === taskId
    })
    this.addCard(card[0], columnId + direction, this.removeCard(taskId, columnId))
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="Board">
          {this.state.columns.map((column, columnIndex) => (
            <Column key={columnIndex} column={column} addCard={this.addCard} removeCard={this.removeCard} reassignCard={this.reassignCard} />
          ))}
        </div>
      </div>
    )
  }
}
export default App;