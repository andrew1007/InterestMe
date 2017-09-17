import React, { Component } from 'react'
import {hashHistory} from 'react-router'

export default class CMSBoardForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  update(content, text) {
    const newText = (typeof content === 'string') ? content : content.currentTarget.value
    this.setState({[text]: newText})
  }

  async handleSubmit(e) {
    e.preventDefault()
    const { name } = this.state
    const createBoardParams = { name }
    this.props.toggleCMSBoard()
    const {board} = await this.props.createBoard(createBoardParams)
    console.log(board);
    hashHistory.push(`boards/${board.id}`)
  }

  render() {
    return (
      <div>
        <h3>New Board</h3>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input onChange={e => this.update(e, 'name')}/>
          <div>
            <button type="Submit" value="Submit">
              Submit
            </button>
            <button onClick={() => this.props.toggleCMSBoard()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }
}
