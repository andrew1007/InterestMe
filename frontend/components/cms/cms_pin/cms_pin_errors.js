import React, { Component } from 'react'

export default class CMSPinErrors extends Component {
  emptyParams() {
    const {title, body, image_url} = this.props
    const paramsArray = Object.entries({title, body, image_url})
    let emptyParams = paramsArray.filter(([desc, val]) => {
      return val === ''
    })
    emptyParams = emptyParams.map(([desc, val]) => {
      return desc === 'image_url' ? 'an image' : desc
    })
    return emptyParams.join(", ")
  }

  render() {
    const text = `${this.props.errorText}`
    const style = {"color": "red", "fontSize": "18px"}
    return (
      <span style={style}>
        {text + this.emptyParams()}
      </span>
    )
  }
}
