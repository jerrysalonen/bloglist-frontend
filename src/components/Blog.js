import React from 'react'

const Blog = ({ blog }) => (
  <li className="list-group-item">
      <h4><a href={blog.url}> {blog.title} by {blog.author}</a></h4>
  </li>
)

export default Blog