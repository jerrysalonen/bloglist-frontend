import React from 'react'

const Notification = ({ message, isError }) => {

  if (message === null) {
    return null
  }

  if (isError) {
    return (
      <div className="error">
        <h4>{message}</h4>
      </div>
    )

  }

  return (
    <div className="success">
      <h4>{message}</h4>
    </div>
  )
}

export default Notification