import React from 'react'
import PropTypes from 'prop-types'

const Login = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <h2 className="display-4">Login</h2>
      <div className="form-group">
        <label htmlFor="username-input">Username:</label>
        <input
          {...props.usernameInput}
          id="username-input"
          className="form-control">
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="password-input">Password:</label>
        <input
          {...props.passwordInput}
          id="password-input"
          className="form-control">
        </input>
      </div>
      <button className="btn btn-primary" type="submit">Login</button>
    </form>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  usernameInput: PropTypes.object.isRequired,
  passwordInput: PropTypes.object.isRequired
}

export default Login