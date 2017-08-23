import React, {Component} from 'react'
import Masonry from 'react-masonry-component'
import BoardTile from './board_tile/board_tile'

export default class BoardMasonry extends Component {

  renderTiles() {
    console.log(this.props);
    return (
      this.props.pins.map((pin, idx) => {
        return <BoardTile key={idx} {...pin}/>
      })
    )
  }

  render() {
    let masonryOptions = {
      fitWidth: true,
      transitionDuration: '0.07s'
    };
    return (
      <div>
        <Masonry
          elementType={'div'}
          disableImagesLoaded={false}
          className='homepage-board'
          options={masonryOptions}
          >
          {this.renderTiles()}
        </Masonry>
      </div>
    )
  }
}
