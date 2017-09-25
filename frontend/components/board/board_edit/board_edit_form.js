import React, { Component } from 'react'

export default class BoardEditForm extends Component {
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
    const newText = typeof content === 'string' ? content: content.currentTarget.value
    this.setState({[type]: newText})
  }

  _handleSubmit(e) {
    e.preventDefault()
    const { name } = this.state
    const { id } = this.props
    const formParams = { name, id }
    this.props.editBoard(formParams)
    console.log('board edit submit');
  }

  render() {
    console.log(this.props);
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
