import React, { Component } from 'react'

export default class ImageLoad extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      loadCounter: 0,
      compLoaded: false
    }
  }

  imageLoaded() {
    this.setState({loadedCounter: this.state.loadedCounter + 1})
    console.log(this.state.loadedCounter);
  }

  componentDidMount() {
    // const ctx = document.getElementById('dawg')
    const imgs = this.imageLoad.getElementsByTagName('img')
    // setTimeout( () => {
      this.setState({loadCounter: imgs.length})
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].setAttribute('style', 'opacity: 0')
        console.log(imgs[i]);
      }
      debugger
      this.setState({loaded: true})
      console.log(imgs);
    // }, 3000)
  }

  render() {
    return (
      <div ref={(ctx) => { this.imageLoad = ctx; }}
        style={{'opacity': `${this.state.loaded ? 1 : 1}`}}>
        <br/><br/><br/><br/><br/><br/>
        {/* <button onClick={this.getTags.bind(this)}>
          asdfasdf
        </button> */}
        {this.props.children}
      </div>
    )
  }
}
