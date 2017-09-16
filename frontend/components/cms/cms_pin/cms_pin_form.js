import React, { Component } from 'react'
import CMSPinFormDropdown from './cms_pin_form_dropdown'
import CMSPinFormImage from './cms_pin_form_image'
import CMSPinErrors from './cms_pin_errors'

export default class CMSPinForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      board_id: '',
      image_url:'',
      errors: false,
    }
    this.errorText = 'The following are required and missing: '
    this.required = ['title', 'body', 'image_url']
  }

  hasEmptyParams() {
    const {title, body, image_url} = this.state
    const paramsArray = Object.entries({title, body, image_url})
    const emptyParams = paramsArray.filter(([desc, val]) => {
      return val === ''
    })
    return emptyParams.length > 0
  }

  handleSubmit(e) {
    e.preventDefault()
    const {title, body, board_id, image_url} = this.state
    const createPinParams = {title, body, board_id, image_url}
    if (this.hasEmptyParams()) {
      this.setState({errors: true})
    } else {
      this.props.createPin(createPinParams)
      this.props.toggleCMSPin()
    }
  }

  update(content, text) {
    const newText = (typeof content === 'string') ? content : content.currentTarget.value
    this.setState({[text]: newText})
  }

  render() {
    const { boards } = this.props
    const {title, body, image_url} = this.state
    const cmsPinFormDropdownProps = {boards, update: (e, text) => this.update(e, text)}
    const cmsPinImageProps = {update: (e, text) => this.update(e, text)}
    const cmsPinErrorsProps = {title, body, image_url, errorText: this.errorText}
    return (
      <div className='cms-pin-form-container'>
        <h3 style={{"marginTop": "0px"}}>New Pin</h3>
        <div className='cms-pin-form-subcontainer'>
          <div className='cms-pin-form-image-container'>
            <CMSPinFormImage {...cmsPinImageProps}/>
          </div>
          <div>
            <div className="cms-pin-form-error-form-container">
              {this.state.errors ? <CMSPinErrors {...cmsPinErrorsProps}/> : null}
            </div>
            <form onSubmit={(e) => this.handleSubmit(e)} className='cms-pin-form-form-container'>
              <div className='cms-pin-form-inputs'>
                {`Title`}
                <input onChange={(e) => this.update(e, 'title')}/>
              </div>
              <div className='cms-pin-form-inputs'>
                {`Description`}
                <textarea type='textarea'
                  onChange={(e) => this.update(e, 'body')}
                  >
                  { this.state.body }
                </textarea>
              </div>
              <div>
                <CMSPinFormDropdown {...cmsPinFormDropdownProps}/>
              </div>
              <div className='cms-pin-form-button-container'>
                <button type="Submit" value="Submit">
                  Submit
                </button>
                <button onClick={() => this.props.toggleCMSPin()}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
