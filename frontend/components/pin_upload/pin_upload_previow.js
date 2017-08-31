import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'

const CLOUDINARY_PRESET = 'punlriir'
const CLOUDINARY_UPLOAD ='https://api.cloudinary.com/v1_1/andoo/upload'

export default class PinUploadPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: null
    }
  }

  _handleDrop(img) {
    let postRequest = request.post(CLOUDINARY_UPLOAD)
    .field('upload_preset', CLOUDINARY_PRESET)
    .field('file', img)
    this._upload(postRequest)
  }

  _upload(request) {
    request.end((errors, results) => {
      if (errors === null) {
        this.setState({imageUrl: results.body.secure_url})
      } else {
        console.log('uploaded error');
      }
    })
  }

  image() {
    return (
      <div>
        <img
          src={this.state.imageUrl}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Dropzone
          mutliple={false}
          accept="image/*"
          onDrop={this._handleDrop.bind(this)}
          className={''}
          >
            { this.state.imageUrl ? this.image() : null }
        </Dropzone>
      </div>
    )
  }
}
