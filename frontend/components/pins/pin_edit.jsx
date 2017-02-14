import React from 'react';

export default class PinEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormOpen: true,
      title: '',
      body: '',
      deleteConfirmBox: false,
      modalIsOpen: false,
      wasDeleteCancel: false
    };
    this.editForm = this.editForm.bind(this);
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
    this.updateButtonSet = this.updateButtonSet.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleDeleteConfirmCancel = this.handleDeleteConfirmCancel.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
  }

  handleDeleteButton(){
    this.setState({deleteConfirmBox: true})
  }

  handleSubmit() {
    if (this.state.wasDeleteCancel){
      this.setState({wasDeleteCancel: false})
      return
    }
    this.props.editPin({title: this.state.title,
      body: this.state.body,
      id: this.props.id,
      board_id: this.props.boardId})
      this.props.handleChildCancelButton()
  }

  update(text) {
    return (e) => this.setState({
      [text]: e.currentTarget.value
    })
  }

  editForm() {
    return (
      <div className="pin-edit-form-container">
        <form onSubmit={this.handleSubmit}>
          <div id="pin-edit-title">Title</div>
          <input
            className="pin-edit-input"
            autoFocus type='text'
            onChange={this.update('title')}
            defaultValue={this.props.title}
         />
       <div id="pin-edit-title">Description</div>

          <textarea
            className="pin-edit-form-textarea"
            autoFocus type='textarea'
            onChange={this.update('body')}
            placeholder="What's this pin about?"
          >
          {this.props.body}
          </textarea>
          <div>
            {
              this.state.deleteConfirmBox ?
              this.deleteConfirm() : this.updateButtonSet()
            }
          </div>
        </form>
      </div>
    );
  }

  handleDeleteSubmit(){
    this.props.deletePin(this.props.id);
    
    this.setState({deleteConfirmBox: false})
    this.props.handleChildCancelButton()
  }

  handleDeleteConfirmCancel(){
    
    this.setState({deleteConfirmBox: false,
    wasDeleteCancel: true})
  }

  deleteConfirm() {
    return(
      <div className='pin-delete-confirm'>
        <button onClick={this.handleDeleteSubmit}>Delete</button>
        <button onClick={this.handleDeleteConfirmCancel}>Cancel</button>
        <br/>
        Are you sure you want to delete?
      </div>
    )
  }

  updateButtonSet(){
    return(
      <div>
        <button type="Submit" value="Submit">
        Update
      </button>
        <button onClick={this.props.handleChildCancelButton}>
          Cancel
        </button>
        <button onClick={this.handleDeleteButton}>
          Delete Pin
        </button>
      </div>
    )
  }

  render(){
    return(
      <div>
        { this.state.editFormOpen ? this.editForm() : null }
      </div>
    )
  }
}
