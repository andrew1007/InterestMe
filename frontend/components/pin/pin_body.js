import React, {Component} from 'react'

export default class PinBody extends Component {
  render() {
    return(
      <div>
        <span>
          <div>
            <img
              src={this.props.profile_picture}
            />
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
