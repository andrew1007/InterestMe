import React from 'react';
import {hashHistory} from 'react-router';
import BoardMasonry from '../boards/board_masonry';

export default class Homepage extends React.Component{
  constructor(props){
    super(props)
    this.state={
      pinsReceieved: false,
      modalIsOpen: false,
      focusedPinId: null,
      finishedLoading: false,
      pinSet: [],
      pinsToRender: [],
      pinBatchCounter: 0,
      pinSetCount: 0,
      hasMorePins: true
    }
    document.body.style.overflow = "auto";
  }


  componentDidMount(){
    this.props.getHome()
  }

  componentWillMount(){
    this.props.getHome()
    .then( () => {
        this.setState({
          finishedLoading: true
        })
    })
  }

  masonryLayout(){
    return (
      <BoardMasonry
        pins={this.props.pins.pins}
        pinSetCount={this.props.pins.pinSetCount}
        owner={null}
        deletePin={null}
        />
    )
  }

  render(){
    //console.log(this.props);
    return(
      <div>
        <div className="homepage-welcome">
        </div>
        <div className="board-overhead-bar-container">
          <div className="board-overhead-bar">
            <a id="board-name">
              Discover
            </a>
            <div className="author-edit-flexbox-hidden">
              invisible filler
            </div>
          </div>
        </div>
        {this.state.finishedLoading ? this.masonryLayout() : null }
      </div>
    )
  }
}
