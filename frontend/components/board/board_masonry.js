import React, {Component} from 'react'
import Masonry from 'react-masonry-component'
import BoardTile from './board_tile/board_tile'
import Waypoint from 'react-waypoint'

export default class BoardMasonry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: [],
      idx: 10,
      loaded: false
    }
  }

  _addTiles() {
    this.setState({
      idx: this.state.idx + 20
    })
  }

  componentDidUpdate() {
    setTimeout( () => $('#hidden').removeAttr('id').addClass('visible'), 500)
  }

  renderTiles() {
    let end = this.state.idx
    let pins = this.props.pins.slice(0, end)
    return pins.map((pin, idx) => {
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
      <div id='hidden'>
        <Masonry
          elementType={'div'}
          disableImagesLoaded={false}
          className='homepage-board'
          options={masonryOptions}
          >
          {this.renderTiles()}
        </Masonry>
          <Waypoint onEnter={this._addTiles.bind(this)} bottomOffset='-1000px'/>
      </div>
    )
  }
}
