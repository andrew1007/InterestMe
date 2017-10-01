import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHome } from '../../actions/pin_actions'
import BoardMasonry from '../board/board_masonry'
import BoardHeader from '../board/board_header'
import CMSPin from '../cms/cms_pin/cms_pin'
import SessionLogin from '../session/session_login/session_login'
import BoardEditForm from '../board/board_edit/board_edit_form'
class HomePresentatinal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  async componentWillMount() {
    await this.props.getHome()
    this.setState({loaded: true})
  }

  render() {
    const headerProps = { name: 'Discover', username: null }
    const pins = Object.values(this.props.pins)
    const boardMasonryProps = { pins }
    // <BoardEditForm/>
    return (
      <div className='home-container'>
        <BoardHeader {...headerProps}/>
        { this.state.loaded ? <BoardMasonry {...boardMasonryProps}/> : null }
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
