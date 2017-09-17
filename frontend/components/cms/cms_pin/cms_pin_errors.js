import React, { Component } from 'react'

export default class CMSPinErrors extends Component {
  emptyParams() {
    const aliases = {image_url: 'image', board_id: 'board'}
    const {title, image_url, board_id} = this.props
    const paramsArray = Object.entries({title, image_url, board_id})
    let emptyParams = paramsArray.filter(([desc, val]) => val === '' || !val)
    emptyParams = emptyParams.map(([desc, val]) => {
      return (desc in aliases) ? aliases[desc] : desc
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
