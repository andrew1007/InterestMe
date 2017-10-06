import React, { Component } from 'react'
import { editBoard, getBoard } from '../../../actions/board_actions';
import { connect } from 'react-redux';

class BoardEditFormPresentational extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  componentWillMount() {
    this.setState({name: this.props.name})
  }

  update(content, type) {
    const newText = typeof content === 'string' ? content : content.currentTarget.value
    this.setState({[type]: newText})
  }

  _handleSubmit(e) {
    e.preventDefault()
    const { name } = this.state
    const { id } = this.props
    const formParams = { name, id }
    this.props.editBoard(formParams)
    this.props.getBoard(id)
    this.props.toggleModal(name)
  }

  render() {
    return (
      <form onSubmit={e => this._handleSubmit(e)}>
        <h2>Edit Board</h2>
        <div>
          <input defaultValue={this.state.name} onChange={(e) => this.update(e, 'name')}/>
        </div>
        <div>
          <button type='Submit' value='Submit'>
            Edit
          </button>
          <button onClick={() => this.props.toggleModal()}>
            Cancel
          </button>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  editBoard: board => dispatch(editBoard(board)),
  getBoard: id => dispatch(getBoard(id))
})

const BoardEditForm = connect(
  null, mapDispatchToProps
)(BoardEditFormPresentational)

export default BoardEditForm
