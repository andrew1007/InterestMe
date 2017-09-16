import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHome } from '../../actions/pin_actions'
import BoardMasonry from '../board/board_masonry'
import BoardHeader from '../board/board_header'
import CMSPin from '../cms/cms_pin/cms_pin'
import SessionLogin from '../session/session_login/session_login'
class HomePresentatinal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maybe: ''
    }
  }

  componentWillMount() {
    this.props.getHome()
  }

  render() {
    console.log(this.props);
    const headerProps = {
      name: 'Discover',
      username: null
    }
    const pins = Object.values(this.props.pins)
    const boardMasonryProps = { pins }
    // <CMSPin/>
    return (
      <div className='home-container'>
        <BoardHeader {...headerProps}/>
        <BoardMasonry {...boardMasonryProps}/>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  getHome: () => dispatch(getHome())
})

const mapStateToProps = ({pins}) => ({
  pins
})

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePresentatinal)

export default Home
