import React from 'react';
import {hashHistory} from 'react-router';

export default class BoardEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editBoxOpen: true,
      deleteConfirmBox: false,
      name: "",
      cancelState: false,
      renderEmptyNameError: false
    };
    this.update = this.update.bind(this);
    this.handleCancelButton = this.handleCancelButton.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleDeleteCancelButton = this.handleDeleteCancelButton.bind(this);
  }

  handleCancelButton() {
    this.setState({
      deleteConfirmBox: false,
      editBoxOpen: false,
      cancelState:true})
    this.props.closeEditModal(this.state)
  }

  handleDeleteCancelButton(){
    this.setState({deleteConfirmBox: false})
    const hiddenText = document.getElementsByClassName("board-edit-delete-confirm-text")
    hiddenText[0].className = hiddenText[0].className + "-hidden"
  }

  componentWillMount(){
    this.setState({
      name: this.props.name
    })
  }

  editButton(){
    return (
      <button onClick={this.handleEditButton.bind(this)}>
        edit
      </button>
    )
  }

  update(text) {
    return e => this.setState({
      [text]: e.currentTarget.value
    });
  }

  handleDeleteButton() {
    this.setState({deleteConfirmBox: true})
    const hiddenText = document.getElementsByClassName("board-edit-delete-confirm-text-hidden")
    hiddenText[0].className = hiddenText[0].className.replace("-hidden", "")
  }

  handleDeleteConfirm() {
    this.props.deleteBoard({id: this.props.boardId});
    document.body.style.overflow = "auto";
    hashHistory.push('/home')
  }

  handleUpdateSubmit(e) {
    if (this.state.cancelState) {
      return
    }
    if (!this.state.name) {
      this.setState({renderEmptyNameError: true})
    } else {
      e.preventDefault();
      this.setState({deleteConfirmBox: false, editBoxOpen: false});
      if (this.state.name.split(" ").join("")){
        this.props.editBoard({name: this.state.name,
          id: this.props.boardId});
        }
        this.props.closeEditModal(this.state);
    }
  }

  boardErrorText(){
    return(
      <div className="edit-board-error-text">
        Board name can't be blank
      </div>
    )
  }

  editForm() {
    //console.log(this.props);
    return (
      <div>
        <form className="board-edit-form" onSubmit={this.handleUpdateSubmit}>
          <span className="edit-board-text">Edit name</span>
          <input
            autoFocus type='text'
            onChange={this.update('name')}
            defaultValue={this.props.name}
          />
          <div className="board-edit-form-buttons">
            {
              this.state.deleteConfirmBox ?
              null
              :
              <div>
                {this.state.renderEmptyNameError ? this.boardErrorText() : null}
                <button type="Submit" value="Submit">
                  Update
                </button>
                  <button onClick={this.handleCancelButton}>
                    Cancel
                  </button>
                <button onClick={this.handleDeleteButton}>
                  Delete board
                </button>
              </div>
            }
            {
              this.state.deleteConfirmBox ?
              <div>
                <button onClick={this.handleDeleteConfirm}>Delete</button>
                <button onClick={this.handleDeleteCancelButton}>Cancel</button>
              </div>
              :
              null
            }
          </div>
        </form>
      </div>
    );
  }

  confirmDeleteBox() {
    return(
      <div>
        <div>Are you sure you want to delete this board?</div>
        <button onClick={this.handleDeleteConfirm}>Delete</button>
        <button onClick={this.handleCancelButton}>Cancel</button>
      </div>
    )
  }

  render() {
    return (
      <div className="edit-board-form">
        {this.editForm()}
        <div className="board-edit-delete-confirm-text-hidden">
          Are you sure you want to delete this board?
        </div>
      </div>
    )
  }
}
