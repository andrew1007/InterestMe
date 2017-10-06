import React, {Component} from 'react'
import Masonry from 'react-masonry-component'
import BoardTile from './board_tile/board_tile'
import Waypoint from 'react-waypoint'
import BoardLoadingIcon from './board_loading_icon'
import OnImagesLoaded from 'react-on-images-loaded'

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

  componentDidMount() {
    this._mounted = true
    const images = this.board.getElementsByTagName('img')
    // debugger
    if (images.length === 0) {
      this.setState({done: true})
    }
  }

  componentWillUnmount() {
    this._mounted = false
  }

  _addTiles() {
    if (this._mounted) {
      this.setState({idx: this.state.idx + 15})
    }
  }

  _revealPins() {
    if (this._mounted) {
      this.setState({done: true}, () => {
        setTimeout( () => {
          $('.hidden').removeClass('hidden').addClass('visible')
        }, 100)
      })
    }
  }

  pinLoaded() {
    let counter = this.state.counter
    let revealCounter = this.state.revealCounter
    let pinCount = this.props.pins.length
    if (this._mounted) {
      this.setState({counter: this.state.counter + 1}, () => {
        if ((counter >= revealCounter || pinCount < revealCounter) && this._mounted) {
          setTimeout(() => this._revealPins(), 10000)
          this.setState({revealCounter: this.state.revealCounter + 15})
        }
      })
      setTimeout(() => this._revealPins(), 100)
    }
  }

  finishedLoading() {
    if (this._mounted) {
      this.setState({done: true})
    }
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
      transitionDuration: '0.01s'
    }
    // classNameOnMount='hidden'
    // classNameOnLoaded='visible'
    // placeholder={<BoardLoadingIcon/>}
    // onLoaded={() => this._revealPins()}
    // <OnImagesLoaded
    //   timeout={0}
    //   delay={50000}
    //   >
  // </OnImagesLoaded>
    return (
        <div ref={board => this.board = board}>
            <Masonry
              elementType={'div'}
              disableImagesLoaded={false}
              className='board-masonry'
              options={masonryOptions}
              >
              {this.state.done ? this.renderTiles() : <BoardLoadingIcon/>}
              </Masonry>
              <Waypoint
                onEnter={this._addTiles.bind(this)}
                bottomOffset='-100px'
              />
        </div>
    )
  }
}
