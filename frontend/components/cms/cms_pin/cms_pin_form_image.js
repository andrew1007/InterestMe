import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import LoadingIcon from '../../shared/loading_icon'

const CLOUDINARY_PRESET = 'punlriir'
const CLOUDINARY_UPLOAD ='https://api.cloudinary.com/v1_1/andoo/upload'

export default class CMSPinFormImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image_url: null,
      isLoading: false
    }
  }

  _handleDrop(img) {
    let postRequest = request.post(CLOUDINARY_UPLOAD)
    .field('upload_preset', CLOUDINARY_PRESET)
    .field('file', img)
    this.setState({isLoading: true})
    this._upload(postRequest)
  }

  _upload(request) {
    request.end((errors, results) => {
      if (errors === null) {
        this.setState({image_url: results.body.secure_url}, () => {
          this.props.update(this.state.image_url, 'image_url')
        })
      } else {
        console.log('uploaded error');
      }
    })
  }

  nonImage() {
    if (!this.state.imageurl && !this.state.isLoading) {
      return <div>upload an image</div>
    } else {
      return <div className="board-loader"/>
    }
  }

  image() {
    return (
      <div>
        <img
          src={this.state.image_url}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this._handleDrop.bind(this)}
          className="cms-pin-form-image-container"
          >
            { this.state.image_url ? this.image() : this.nonImage() }
        </Dropzone>
      </div>
    )
  }
}
