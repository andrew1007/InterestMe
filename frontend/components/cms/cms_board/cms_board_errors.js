import React, { Component } from 'react'

export default class CMSBoardErrors extends Component {
  emptyParams() {
    const aliases = {}
    const {name} = this.props
    const paramsArray = Object.entries({name})
    let emptyParams = paramsArray.filter(([desc, val]) => val === '' || !val)
    emptyParams = emptyParams.map(([desc, val]) => {
      return (desc in aliases) ? aliases[desc] : desc
    })
    return emptyParams.join(", ")
  }

  render() {
    const text = `${this.props.errorText}`
    const style = {color: "red", fontSize: "18px"}
    return (
      <span style={style}>
        {text + this.emptyParams()}
      </span>
    )
  }
}
