import React, { Component } from 'react'
import "../styles/Column.css"
import Card from './Card'

class Column extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newTask: "",
            currentTaskId: 0,
        }
        this.addCard = this.addCard.bind(this)
        this.handleTaskChange = this.handleTaskChange.bind(this)
    }
    //This method assigns the state newTask with that provided by the user and calls the
    //prop of the same name
    //Paramters:
    //event - the event that triggerd this method 
    addCard = (event) => {
        if (event.keyCode === 13 || event.target.name === "addcard") {
            if (this.state.newTask !== "") {
                const newCard = { task: this.state.newTask, columnId: this.props.column.columnId }
                this.props.addCard(newCard, this.props.column.columnId)
                this.setState({ newTask: "", currentTaskId: this.state.currentTaskId + 1 })
            }
        }
    }
    //This method simply calls the prop of the same
    //Parameters:
    //taskId - the ID of the task to be reassigned
    //direction - an integer denoting whether to move left(-1) or right(1)
    reassignCard = (taskId, direction) => {
        this.props.reassignCard(taskId, this.props.column.columnId, direction)

    }
    //This method simply calls prop of the same name
    //Parameters:
    //taskId : the ID of the task to be removed
    removeCard = (taskId) => {
        this.props.removeCard(taskId, this.props.column.columnId)
    }
    //This method is the event handler for onChange event of input text box
    handleTaskChange = (event) => {
        this.setState({ newTask: event.target.value })
    }
    componentDidMount() {
        this.setState({ cards: this.props.cards, currentColumn: this.props.column.columnId })
    }
    render() {
        return (
            <div className="Column">
                <h3>{this.props.column.columnTitle}</h3>
                <hr />
                {this.props.column.columnId === 0 ? <div className="TaskInput">
                    <input type="text" placeholder="To Do" value={this.state.newTask} onKeyDown={this.addCard} onChange={this.handleTaskChange} />
                    <button className="AddButton" name="addcard" onClick={this.addCard} onKeyDown={this.addCard}>Add</button>
                </div> : ""}
                {this.props.column.cards.map((card, cardIndex) => (
                    < Card key={cardIndex} card={card} removeCard={this.removeCard} reassignCard={this.reassignCard} columnId={this.props.column.columnId} />
                ))}

            </div>
        )
    }
}
export default Column