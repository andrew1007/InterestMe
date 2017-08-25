import React, {Component} from 'react'
import Masonry from 'react-masonry-component'
import BoardTile from './board_tile/board_tile'
import Waypoint from 'react-waypoint'

export default class BoardMasonry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: [],
      startIdx: 0,
      endIdx: 10,
      loaded: false
    }
  }

  componentDidUpdate(nextProps) {
    if (this.props.pins.length !== nextProps.pins.length) {
      let pins = nextProps.pins.slice(0,20).map((pin, idx) => {
        return <BoardTile key={idx} {...pin}/>
      })
      this.setState({
        pins: pins,
        loaded: false
      })
    }
  }

  _addTiles() {
    this.setState({
      endIdx: this.state.endIdx + 10
    })
  }

  componentDidUpdate() {
    setTimeout( () => $('.hidden').removeClass('hidden').addClass('visible'), 500)
  }

  renderTiles() {
    console.log(this.props);
    return this.props.pins.slice(this.state.startIdx, this.state.endIdx).map((pin, idx) => {
      return <BoardTile key={idx} {...pin}/>
    })
  }

  render() {
    console.log(this.state);
    let masonryOptions = {
      fitWidth: true,
      transitionDuration: '0.07s'
    };
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
          <Waypoint onEnter={this._addTiles.bind(this)} bottomOffset='-400px'/>
      </div>
    )
  }
}
