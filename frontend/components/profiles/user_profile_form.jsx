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
      imageUrl: "",
      description: ""
    }
    //
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.previewImage = this.previewImage.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(img){
    let imgUploaded = img[0]
    let upload = request.post(CLOUDINARY_UPLOAD)
    .field('upload_preset', CLOUDINARY_PRESET)
    .field('file', img);
    upload.end((errors, results) => {
      if (errors === null) {
        this.setState({imageUrl: results.body.secure_url})
      } else {
        //console.log("error uploading!");
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.imageUrl){
      var imagex = this.props.user.user.profile_picture
    } else {
      var imagex = this.state.imageUrl
    }
    this.props.editProfilePage({
      profile_picture: imagex,
      id: this.props.user.user.id,
      description: this.state.description
    })
    this.props.handleSelfClose()
    this.setState({imageUrl: null})
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

    render() {
      //console.log(this.props);
      return (
        <div className="user-profile-edit-container">
          <div className="dropzone-image-container">
            <Dropzone
              multiple={false}
              accept="image/*"
              onDrop={this.handleDrop}
              className="user-profile-edit-image-preview"
              >
              <div className="user-profile-edit-image-dropzone-text">
                {this.state.imageUrl ? this.previewImage() : "click or drag to add image"}
              </div>
            </Dropzone>
          </div>

          <form className="user-profile-edit-form" onSubmit={this.handleSubmit}>
              <textarea
                className="user-profile-description-textarea"
                type="textarea"
                placeholder="Tell us about yourself"
                onChange={this.update('description')}
              >
              {this.props.user.user.description}
            </textarea>
            <div className = "user-profile-edit-submit-button">
              <button type="Submit" value="Submit">
                Update
              </button>
              <button onClick={() => this.props.handleSelfClose()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )
    }
}
