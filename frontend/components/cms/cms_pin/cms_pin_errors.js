import React, { Component } from 'react'

export default class CMSPinErrors extends Component {
  emptyParams() {
    const {title, image_url, board_id} = this.props
    const paramsArray = Object.entries({title, image_url, board_id})
    let emptyParams = paramsArray.filter(([desc, val]) => {
      return val === '' || !val
    })
    emptyParams = emptyParams.map(([desc, val]) => {
      if (desc === 'image_url') {
        return 'image'
      } else if (desc === 'board_id') {
        return 'board'
      } else {
        return desc
      }
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
