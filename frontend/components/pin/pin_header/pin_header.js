import React, {Component} from 'react'

export default class PinHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className='pin-header-title-link-container'>
          <div className='pin-header-title'>
            {this.props.title}
          </div>
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
