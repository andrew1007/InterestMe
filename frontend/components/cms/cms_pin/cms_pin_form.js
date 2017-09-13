import React, { Component } from 'react'
import CMSPinFormDropdown from './cms_pin_form_dropdown'
import CMSPinImage from './cms_pin_image'

export default class CMSPinForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      board_id: '',
      image_url:''
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const {title, body, board_id, image_url} = this.state
    const createPinParams = {title, body, board_id, image_url}
    this.props.createPin({...createPinParams})
  }

  update(content, text) {
    const newText = (typeof content === 'string') ? content : content.currentTarget.value
    this.setState({[text]: newText})
    console.log(this.state);
  }

  render() {
    const { boards } = this.props
    const cmsPinFormDropdownProps = {boards, update: (e, text) => this.update(e, text)}
    const cmsPinImageProps = {update: (e, text) => this.update(e, text)}
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        {`Title`}
        <input onChange={(e) => this.update(e, 'title')}/>
        {`Description`}
        <textarea type='textarea'
          onChange={(e) => this.update(e, 'body')}
          >
          { this.state.body }
        </textarea>
        <CMSPinFormDropdown {...cmsPinFormDropdownProps}/>
        <CMSPinImage {...cmsPinImageProps}/>
        <button type="Submit" value="Submit">
          Submit
        </button>
      </form>
    )
  }
}
