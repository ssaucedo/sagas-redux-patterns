import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Pattern2 from '../../components/Pattern2/Pattern2'

class Pattern2Container extends Component {

  constructor (props) {
    super(props)
    this.startOperation = this.startOperation.bind(this)
    this.operationQueue = this.operationQueue.bind(this)
  }


  startOperation () {
    for(let i = 0; i < 50 ;i++) {
      this.props.dispatch({type: 'START_NEW_OPERATION'})
    }
  }

  operationQueue () {
    this.props.dispatch({type: 'OPERATION_QUEUE'})
  }


  render () {
    return (
      <Pattern2 {...this.props} startOperation={this.startOperation} operationQueue={this.operationQueue}/>
    )
  }
}

Pattern2Container.propTypes = {
  operations: PropTypes.object,
  active: PropTypes.bool,
}

const mapStateToProps = ({pattern2}) => ({
    operations: pattern2.operations,
    active: pattern2.semaphore.active,
  })

export default connect(mapStateToProps)(Pattern2Container)
