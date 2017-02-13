import React from 'react';
import Modal from 'react-modal';
import Masonry from 'react-masonry-component'
import PinContainer from '../pins/pins_container'
import {hashHistory} from 'react-router';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.newBoardForm = this.newBoardForm.bind(this);
  }

  update(text) {
    return e => this.setState({
      [text]: e.currentTarget.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.handleSelfClose()
    this.props.createBoard({name: this.state.name})
    .then((action) => hashHistory.push(`/boards/${action.board.id}`))
  }

  newBoardForm() {
    return(
      <div className='board-new-form-container'>
        <form className="board-new-form" onSubmit={this.handleSubmit}>
          <span className="board-new-text">
            New board
          </span>
          <br/>
          <input
            className="board-new-input"
            autoFocus type='text' onChange={this.update('name')}
            />
          <br/>
          <div className="board-new-form-buttons-container">
            <button type="Submit" value="Submit">
              Create
            </button>
            <button onClick={() => this.props.handleSelfClose()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.newBoardForm()}
      </div>)
    }
}
