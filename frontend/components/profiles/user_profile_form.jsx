import React from 'react';
import Modal from 'react-modal';
import {hashHistory} from 'react-router';
import Dropzone from 'react-dropzone'
import request from 'superagent';
const CLOUDINARY_PRESET = 'tknultlh'
const CLOUDINARY_UPLOAD ='https://api.cloudinary.com/v1_1/dukcet22g/upload'

export default class UserProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      imageUrl: this.props.user.profile_picture,
      description: this.props.user.description,
      submit: true
    }
    //
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
    this.update = this.update.bind(this);
    this.previewImage = this.previewImage.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(img) {
    let imgUploaded = img[0]
    let upload = request.post(CLOUDINARY_UPLOAD)
    .field('upload_preset', CLOUDINARY_PRESET)
    .field('file', img);
    upload.end((errors, results) => {
      if (errors === null) {
        this.setState({imageUrl: results.body.secure_url})
      } else {
        //////console.log("error uploading!");
      }
    })
  }

  componentDidMount(){
    this.setState({submit: true})
  }

  _handleSubmit(e) {
    e.preventDefault();
    debugger
    if (this.state.submit) {
      let image = this.state.imageUrl
      this.props.editProfilePage({
        profile_picture: image,
        id: this.props.user.id,
        description: this.state.description
      })
    }
    this.props.closeModal()
  }

  _handleCancel(){
    debugger
    this.setState({submit: false})
  }

  update(text) {
    return e => this.setState({
      [text]: e.currentTarget.value
    });
  }

  previewImage() {
    return (
      <div>
        {this.state.imageUrl ? null :
          <div className="upload-mini-text">
            Image preview
          </div>}
        { this.state.imageUrl ?
          <img className="image-preview" src={this.state.imageUrl}/>
          : null}
      </div>
    )
  }

  dropZone() {
    return (
      <div className="dropzone-image-container">
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.handleDrop}
          className={this.state.imageUrl ? "user-profile-edit-image-preview" : "user-profile-edit-image-preview-active"}
          >
          <div className="user-profile-edit-image-dropzone-text">
            { this.state.imageUrl ? this.previewImage()
              : "click or drag to add image" }
          </div>
        </Dropzone>
      </div>
    )
  }

  editForm() {
    return (
      <form className="user-profile-edit-form" onSubmit={this._handleSubmit}>
        <textarea
          className="user-profile-description-textarea"
          type="textarea"
          placeholder="Tell us about yourself"
          onChange={this.update('description')}
          defaultValue={this.state.description}
          />
        <div className = "user-profile-edit-submit-button">
          <button type="Submit" value="Submit">
            Update
          </button>
          <button onClick={this._handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    )
  }

  render() {
    //////console.log(this.props);
    return (
      <Modal
        isOpen={true}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.props.closeModal}
        contentLabel="Modal"
        className="user-profile-update-picture-modal"
      >
        <div className="user-profile-edit-container">
          {this.dropZone()}
          {this.editForm()}
        </div>
      </Modal>
    )
  }
}
