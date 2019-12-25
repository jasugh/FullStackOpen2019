import React from 'react'

const Notification = (props) => {
  const {notification} = props.srore.getState()

  // console.log('notification **** ', notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification.notification === null) {
    return null
  }


  return (
    <div style={style}>
      {notification.notification}
    </div>
  )
}

export default Notification