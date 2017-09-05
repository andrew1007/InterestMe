import React, {Component} from 'react'
import Masonry from 'react-masonry-component'
import BoardTile from './board_tile/board_tile'
import Waypoint from 'react-waypoint'
import BoardLoadingIcon from './board_loading_icon'

export default class BoardMasonry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: [],
      idx: 10,
      counter: 0,
      revealCounter: 8,
      done: false
    }
    this.pinLoaded = this.pinLoaded.bind(this)
  }

  _addTiles() {
    this.setState({
      idx: this.state.idx + 15,
    })
  }

  _revealPins() {
    this.setState({done: true}, () => {
      setTimeout( () => {
        $('.hidden').removeClass('hidden').addClass('visible')
      }, 100)
    })
  }

  pinLoaded() {
    let counter = this.state.counter
    let revealCounter = this.state.revealCounter
    let pinCount = this.props.pins.length
    this.setState({counter: this.state.counter + 1}, () => {
      if (counter > revealCounter || pinCount < revealCounter) {
        this._revealPins()
        this.setState({revealCounter: this.state.revealCounter + 15})
      }
    })
    setTimeout(() => this._revealPins(), 7000)
  }

  renderTiles() {
    let end = this.state.idx
    let pins = this.props.pins.slice(0, end)
    return pins.map((pin, idx) => {
      let tileProps = {...pin, pinLoaded: this.pinLoaded}
      return <BoardTile key={idx} {...tileProps}/>
    })
  }

  render() {
    let masonryOptions = {
      fitWidth: true,
      transitionDuration: '0.05s'
    };
    return (
      <div>
        {this.state.done ? null : <BoardLoadingIcon/>}
        <div className='hidden'>
          <Masonry
            elementType={'div'}
            disableImagesLoaded={false}
            className='board-masonry'
            options={masonryOptions}
            >
              {this.renderTiles()}
            </Masonry>
            <Waypoint
              onEnter={this._addTiles.bind(this)}
              bottomOffset='-100px'
            />
          </div>
      </div>
    )
  }
}
