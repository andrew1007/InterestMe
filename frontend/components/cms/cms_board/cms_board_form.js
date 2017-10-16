import React, { Component } from 'react'
import {hashHistory} from 'react-router'
import CMSBoardErrors from './cms_board_errors'

export default class CMSBoardForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      firstCheck: false,
      error: false
    }
    this.errorText = 'The following are still required: '
  }

  hasEmptyParams() {
    const {name} = this.state
    const paramsArray = Object.entries({name})
    const emptyParams = paramsArray.filter(([desc, val]) => val === '' || !val)
    return emptyParams.length > 0
  }

  update(content, text) {
    const newText = (typeof content === 'string') ? content : content.currentTarget.value
    this.setState({[text]: newText}, () => {
      this.setState({error: this.hasEmptyParams() && this.state.error ? true : false}, () => {
        console.log(this.hasEmptyParams());
        console.log(`errors: ${this.state.error}`);
      })
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    if (this.hasEmptyParams()) {
      this.setState({error: true})
    } else {
      const { name } = this.state
      const createBoardParams = { name }
      this.props.toggleCMSBoard()
      const { board } = await this.props.createBoard(createBoardParams)
      hashHistory.push(`boards/${board.id}`)
    }
  }

  render() {
    const { name } = this.state
    const { errorText } = this
    const cmsBoardErrorsProps = { name, errorText }
    return (
      <div>
        <h3>New Board</h3>
        {this.state.error ? <CMSBoardErrors {...cmsBoardErrorsProps}/> : null}
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
