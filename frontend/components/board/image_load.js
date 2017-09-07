import React, { Component } from 'react'

export default class ImageOnLoad extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      loadCounter: 0,
      imageCount: 0,
      timedOut: true
    }
  }

  componentDidMount() {
    this.props.onLoadingImages ? this.props.onLoadingImages() : null
    const imgs = this.imageLoad.getElementsByTagName('img')
    let delay = this.props.delay ? this.props.delay : 500
    let timeout = this.props.timeout ? this.props.timeout : 5000
    timeout = Math.max(this.props.timeout, this.props.delay)
    this.setState({imageCount: imgs.length}, () => {
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("load", () => {
          this.setState({
            loadCounter: this.state.loadCounter + 1
          }, () => {
            setTimeout(() => {
              if (this.state.loadCounter === this.state.imageCount) {
                this.setState({loaded: true, timedOut: false})
                this.props.onLoadedImages()
              }
            }, delay)
          }
        )
        setTimeout(() => {
          if (this.state.timedOut) {
            this.setState({loaded: true})
            this.props.onLoadedImages()
          }
        }, timeout)
      })
    }})
  }

  render() {
    let currentClassName
    if (this.state.loaded) {
      currentClassName = this.props.onLoadClassName
    } else {
      currentClassName = this.props.loadingClassName
    }
    let placeholder = this.props.placeholder ? this.props.placeholder : null
    return (
      <div>
        {
          this.state.loaded ? null :
          <div>
            {placeholder}
          </div>
        }
        <div ref={(ctx) => { this.imageLoad = ctx}}
          className={currentClassName}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
