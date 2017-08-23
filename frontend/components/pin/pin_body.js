import React, {Component} from 'react'

export default class PinBody extends Component {
  render() {
    return(
      <div>
        <span>
          <div>
            {this.props.profile_pictures}
          </div>
          <div>
            {this.props.username}
          </div>
        </span>
        <span>
          <p>
            {this.props.body}
          </p>
        </span>
      </div>
    )
  }
}
