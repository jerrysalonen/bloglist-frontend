import React from 'react'

const Login = (props) => {
    return (
        <form onSubmit={props.handleLogin}>
            <h2 className="display-4">Login</h2>
            <div className="form-group">
                <label htmlFor="username-input">Username:</label>
                <input 
                    type="text"
                    id="username-input"
                    className="form-control"
                    value={props.username}
                    onChange={({target}) => props.setUsername(target.value)}>
                </input>
            </div>
            <div className="form-group">
                <label htmlFor="password-input">Password:</label>
                <input
                    type="password"
                    id="password-input"
                    className="form-control"
                    value={props.password}
                    onChange={({target}) => props.setPassword(target.value)}>
                    </input>
            </div>
            <button className="btn btn-primary" type="submit">Login</button>
        </form>
    )
}

export default Login