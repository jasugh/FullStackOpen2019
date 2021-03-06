import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    color: props.notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (props.notification.length === 0) {
    return null
  }

  return (
    <div style={style}>
      {props.notification.notification}
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification
})

export default connect(
  mapStateToProps
)(Notification)