import React, {Component} from 'react'
import Masonry from 'react-masonry-component'
import BoardTile from './board_tile/board_tile'
import Waypoint from 'react-waypoint'

export default class BoardMasonry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: [],
      idx: 20,
      loaded: false,
      counter: 0,
      revealCounter: 19,
      done: false
    }
  }

  _addTiles() {
    this.setState({
      idx: this.state.idx + 15
    })
  }

  pinLoaded() {
    let counter = this.state.counter
    let reveal = this.state.revealCounter
    let pinCount = this.props.pins.length
    this.setState({counter: this.state.counter += 1}, () => {
      if (counter > reveal || pinCount < reveal) {
        $('.hidden').removeClass('hidden').addClass('visible')
        this.setState({revealCounter: this.state.revealCounter + 15})
      }
    })
  }

  renderTiles() {
    let end = this.state.idx
    let pins = this.props.pins.slice(0, end)
    return pins.map((pin, idx) => {
      let tileProps = {...pin, pinLoaded: this.pinLoaded.bind(this)}
      return <BoardTile key={idx} {...tileProps}/>
    })
  }

  render() {
    console.log(this.state);
    let masonryOptions = {
      fitWidth: true,
      transitionDuration: '0.05s'
    };
    console.log(this.state);
    return (
      <div className='hidden'>
        <Masonry
          elementType={'div'}
          disableImagesLoaded={false}
          className='homepage-board'
          options={masonryOptions}
          >
          {this.renderTiles()}
        </Masonry>
        <Waypoint
          onEnter={this._addTiles.bind(this)}
          bottomOffset='-100px'
        />
      </div>
    )
  }
}
