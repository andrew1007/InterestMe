import React, { Component } from 'react'

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

  handleSubmit(e) {
    e.preventDefault()
    const { name } = this.state
    const createBoardParams = { name }
    this.props.createBoard(createBoardParams)
    this.props.toggleCMSBoard()
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
