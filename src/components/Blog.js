import React, { useState } from 'react'

const Blog = ({ blog, likeHandler, deleteBlog, username }) => {
  const [fullView, setFullView] = useState(false)

  const toggleFullView = () => {
    setFullView(!fullView)
  }

  const like = (event) => {
    event.preventDefault()
    const newBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }
    likeHandler(newBlog, blog.id)
  }

  const removeButton = () => {
    if (blog.user.username === username) {
      return (
        <button onClick={() => deleteBlog(blog.id)}>Remove</button>
      )
    }
  }

  if (fullView) {
    return (
      <li className="list-group-item">
        <div onClick={toggleFullView} style={{ cursor: 'pointer' }}>
          <h4>{blog.title} by {blog.author}</h4>
        </div>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} likes</p>
        <button onClick={like}>Like</button>
        <p>Added by {blog.user.name}</p>
        {removeButton()}

      </li>
    )
  } else {
    return (
      <li className="list-group-item" onClick={toggleFullView} style={{ cursor: 'pointer' }}>
        <h4>{blog.title} by {blog.author}</h4>
      </li>
    )
  }
}

export default Blog