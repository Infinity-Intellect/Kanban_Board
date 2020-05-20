import React, { Component } from 'react'
import Column from "./components/Column"
import Header from "./components/Header"
import "./App.css"
//Application starts here
//Application Flow:
//1.The App component calls the Column component with each of the columns in the state as props
//2.The Column component in turn calls the Card component with each of the card in the column object
//3.Events to be handled are sent back up the chain to the parent App component to be handled

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //stores the current task ID
      currentTaskId: 0,
      //Stores task data of each column
      columns: [
        //To do column
        {
          columnId: 0,
          cards: [],
          columnTitle: "To do"
        },
        //Doing column
        {
          columnId: 1,
          cards: [],
          columnTitle: "Doing"
        },
        //Done column
        {
          columnId: 2,
          cards: [],
          columnTitle: "Done"
        }
      ]
    }
  }
  /*Each of the methods below are passed as props to the Component "Column"*/

  //This method adds new cards to a specific column
  //Parameters:
  //newCard - new card to be added
  //columnId - column in which new card is to be added
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
  //This method removes card from a specific column
  //Parameters:
  //taskId - the task to be removed
  //columnId- the column in which the task currently resides
  removeCard = (taskId, columnId) => {
    let cards = this.state.columns[columnId].cards
    cards = cards.filter(card => {
      return card.taskId !== taskId
    })
    let columns = this.state.columns
    columns[columnId].cards = cards
    this.setState({ columns: columns })
  }
  //This method calls both add card and remove card thereby reassigning a task
  //Parameter:
  //taskId - the ID of the task to be reassigned
  //columnId - the column the task to be reassigned is currently in
  //direction - an integer denoting whether to move left(-1) or right(1)
  //            (decided in Card.js)
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