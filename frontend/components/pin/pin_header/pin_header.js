import React, {Component} from 'react'

export default class PinHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>
          <span>
            {this.props.title}
          </span>
          <span>
            edit link
          </span>
        </div>
        <div>
          Board link
        </div>
      </div>
    )
  }
}
