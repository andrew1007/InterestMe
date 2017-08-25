import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHome } from '../../actions/pin_actions'
import BoardMasonry from '../board/board_masonry'
import BoardHeader from '../board/board_header'

class HomePresentatinal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maybe: ''
    }
    document.body.style.overflow = "auto";
  }

  componentWillMount() {
    this.props.getHome()
  }

  render() {
    let headerProps = {
      name: 'Discover',
      username: null
    }
    return(
      <div>
        <br/><br/><br/><br/><br/>
        <BoardHeader {...headerProps}/>
        <BoardMasonry pins={Object.values(this.props.pins)}/>
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
