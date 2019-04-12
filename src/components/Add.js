import React from 'react'
import PropTypes from 'prop-types'

const Add = (props) => {
  return (
    <form onSubmit={props.blogSubmit}>
      <h2 className="display-4">Add a blog</h2>
      <div className="form-group">
        <label htmlFor="name-input">Title:</label>
        <input
          type="text"
          id="name-input"
          className="form-control"
          value={props.title}
          onChange={({ target }) => props.setTitle(target.value)}>
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="author-input">Author:</label>
        <input type="text"
          id="author-input"
          className="form-control"
          value={props.author}
          onChange={({ target }) => props.setAuthor(target.value)}>
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="url-input">URL:</label>
        <input type="text"
          id="url-input"
          className="form-control"
          value={props.url}
          onChange={({ target }) => props.setUrl(target.value)}>
        </input>
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  )
}

Add.propTypes = {
  blogSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
}

export default Add