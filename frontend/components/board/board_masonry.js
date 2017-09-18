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
          this._revealPins()
          this.setState({revealCounter: this.state.revealCounter + 15})
        }
      })
      setTimeout(() => this._revealPins(), 7000)
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
    return (
      <OnImagesLoaded
        classNameOnMount='hidden'
        classNameOnLoaded='visible'
        placeholder={<BoardLoadingIcon/>}
        timeout={0}
        delay={500}
        >
        <div>
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
      </OnImagesLoaded>
    )
  }
}
