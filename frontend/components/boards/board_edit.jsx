import React from 'react';
import {hashHistory} from 'react-router';
import Modal from 'react-modal'

export default class BoardEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      deleteConfirmShow: false,
      name: "",
      nameUpdated: false
      // ,
      // cancelSubmission: false,
      // deleteSubmission: false,
      // updateSubmission: false
      // deleteConfirmShow: false,
      // name: "",
      // cancelState: false,
      // showError: false
    };
    this.update = this.update.bind(this);
    this.handleCancelSubmit = this.handleCancelSubmit.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleDeleteCancelButton = this.handleDeleteCancelButton.bind(this);
  }

  handleDeleteCancelButton(){
    this.setState({deleteConfirmShow: false})
    const hiddenText = document.getElementsByClassName("board-edit-delete-confirm-text")
    hiddenText[0].className = hiddenText[0].className + "-hidden"
  }

  componentWillMount(){
    this.setState({
      name: this.props.name,
      showError: false,
      deleteConfirmShow: false,
      nameUpdated: false
    })
  }

  update(text) {
    return e => this.setState({
      [text]: e.currentTarget.value
    });
  }

  handleDeleteButton() {
    this.setState({deleteConfirmShow: true})
    const hiddenText = document.getElementsByClassName("board-edit-delete-confirm-text-hidden")
    hiddenText[0].className = hiddenText[0].className.replace("-hidden", "")
  }

  handleDeleteSubmit() {
    this.props.deleteBoard({id: this.props.boardId});
    document.body.style.overflow = "auto";
    hashHistory.push('/home')
  }

  handleCancelSubmit() {
    this.setState({nameUpdated: false})
    this.props.closeEditModal(this.state)
  }

  handleUpdateSubmit(e) {
    e.preventDefault();
    if (!this.state.name) {
      this.setState({showError: true})
    } else {
      this.setState({nameUpdated: true})
      this.props.editBoard({name: this.state.name.split(" ").join(""),
      id: this.props.boardId});
      setTimeout( () => {
        this.props.closeEditModal(this.state)
      }, 0)
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
    return (
      <div className="edit-board-form">
        <form className="board-edit-form" onSubmit={this.handleUpdateSubmit}>
          <span className="edit-board-text">Edit name</span>
          <input
            autoFocus type='text'
            onChange={this.update('name')}
            defaultValue={this.state.name}
          />
          <div className="board-edit-form-buttons">
            <div className="board-edit-delete-confirm-text-hidden">
              Are you sure you want to delete this board?
            </div>
            <div>
              {
                this.state.deleteConfirmShow ?
                null
                :
                <div>
                  {this.state.showError ? this.boardErrorText() : null}
                  <button type="Submit" value="Submit">
                    Update
                  </button>
                  <button onClick={this.handleCancelSubmit}>
                    Cancel
                  </button>
                  <button onClick={this.handleDeleteButton}>
                    Delete board
                  </button>
                </div>
              }
              {
                this.state.deleteConfirmShow ?
                <div>
                  {this.confirmDeleteBox()}
                </div>
                :
                null
              }
            </div>
          </div>
        </form>
      </div>
    );
  }

  confirmDeleteBox() {
    return(
        <div>
          <button onClick={this.handleDeleteSubmit}>Delete</button>
          <button onClick={this.handleDeleteCancelButton}>Cancel</button>
        </div>
    )
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={true}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={() => this.props.closeEditModal(this.state)}
          contentLabel="Session form"
          className="board-edit-modal"
          >
          {this.editForm()}
        </Modal>
      </div>
    )
  }
}
