import React, { Component } from 'react'
import "../styles/Card.css"

class Card extends Component {
    render() {
        return (
            <div className="Card">
                <div className="Header">
                    <div className="Title">
                        <h3>Task</h3>
                    </div>
                    <div className="Close">
                        <h3 className="CloseButton" onClick={() => { this.props.removeCard(this.props.card.taskId) }}>X</h3>
                    </div>
                </div>
                <div className="Body">
                    {this.props.columnId === 1 || this.props.columnId === 2 ? <div className="moveLeft">
                        <p className="Arrow" onClick={() => this.props.reassignCard(this.props.card.taskId, -1)}>{"<"}</p>
                    </div> : <div></div>}
                    <div className="TaskDescription">
                        <p>{this.props.card.task}</p>
                    </div>
                    {this.props.columnId === 0 || this.props.columnId === 1 ? <div className="moveRight">
                        <p className="Arrow" onClick={() => this.props.reassignCard(this.props.card.taskId, 1)}>{" > "}</p>
                    </div> : <div></div>}


                </div>


            </div>
        )
    }
}
export default Card