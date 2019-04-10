import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Add from './components/Add'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import 'bootstrap/dist/css/bootstrap.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userTemp = JSON.parse(loggedUserJSON)
      setUser(userTemp)
      blogService.setToken(userTemp.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <Login
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    )
  }

  const loggedIn = () => {
    return (
      <div>
        <h2 className="display-3">Blogs</h2>

        <div className="row mx-md-2">
          <p>{user.name} logged in.</p>
          <button className="btn btn-primary mx-md-3" onClick={() => {
            window.localStorage.clear()
            setUser(null)
            blogService.setToken(null)
          }}>Log out</button>
        </div>

        <ul className="list-group my-md-3">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </ul>

        <Add
          blogSubmit={blogSubmit}
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
        />
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userTemp = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(userTemp)
      )

      setUser(userTemp)
      blogService.setToken(userTemp.token)
      setUsername('')
      setPassword('')

      setNotificationMsg(`Successfully logged in as ${user.name}`)
      setIsError(false)

      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)

    } catch (exception) {
      setUsername('')
      setPassword('')

      setNotificationMsg('Wrong username or password')
      setIsError(true)

      setTimeout(() => {
        setNotificationMsg(null)
        setIsError(false)
      }, 5000)
    }
  }

  const blogSubmit = async (event) => {
    event.preventDefault()
    try {
      const blogTemp = {
        title: title,
        author: author,
        url: url
      }

      const newBlog = await blogService.postNew(blogTemp)
      setBlogs(blogs.concat(newBlog))

      setTitle('')
      setAuthor('')
      setUrl('')

      setNotificationMsg(`Blog ${blogTemp.title} added`)
      setIsError(false)

      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)

    } catch (exception) {
      console.log(exception)
      setTitle('')
      setAuthor('')
      setUrl('')

      setNotificationMsg('Posting the blog failed')
      setIsError(true)

      setTimeout(() => {
        setNotificationMsg(null)
        setIsError(false)
      }, 5000)
    }
  }

  return (
    <div className="container">
      <div className="col my-md-2 col-md-6">

        <Notification message={notificationMsg} isError={isError} />

        {user === null ? loginForm() : loggedIn()}

      </div>
    </div>
  )
}

export default App