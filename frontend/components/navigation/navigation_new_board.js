import React, {Component} from 'react'
import CMSBoard from '../cms/cms_board/cms_board'

export default class NavigationNewBoard extends Component {New
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  toggleCMSBoard() {
    this.setState({show: this.state.show ? false : true})
  }

  render() {
    const cmsBoardProps = {
      toggleCMSBoard: () => this.toggleCMSBoard()
    }
    return (
      <div>
        <button onClick={() => this.toggleCMSBoard()}>
          new board
        </button>
        {this.state.show ? <CMSBoard {...cmsBoardProps}/> : null}
      </div>
    )
  }

}
