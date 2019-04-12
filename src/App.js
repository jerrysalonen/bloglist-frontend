import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Add from './components/Add'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import ShowOrHide from './components/ShowOrHide'
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
  const blogRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => { return b.likes - a.likes })
      setBlogs(blogs)
    })
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
            <Blog key={blog.id} blog={blog} likeHandler={likeHandler} deleteBlog={deleteBlog} username={user.username} />
          )}
        </ul>

        <ShowOrHide btnLabel="Add a blog" ref={blogRef}>
          <Add
            blogSubmit={blogSubmit}
            title={title}
            author={author}
            url={url}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
          />
        </ShowOrHide>
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

      setNotificationMsg(`Successfully logged in as ${userTemp.name}`)
      setIsError(false)

      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)

    } catch (exception) {
      setUsername('')
      setPassword('')

      console.log(exception)

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
    blogRef.current.toggleVisibility()
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

  const likeHandler = async (newBlog, id) => {
    try {
      await blogService.update(newBlog, id)

      const updatedBlogs = await blogService.getAll()
      await updatedBlogs.sort((a, b) => { return b.likes - a.likes })
      setBlogs(updatedBlogs)
    } catch (exception) {
      setNotificationMsg('Something went wrong :(')
      setIsError(true)

      setTimeout(() => {
        setNotificationMsg(null)
        setIsError(false)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    let confirm = window.confirm('Are you sure you want to delete this blog?')
    if (confirm) {
        try {
          await blogService.remove(id)
          const updatedBlogs = await blogService.getAll()
          await updatedBlogs.sort((a, b) => { return b.likes - a.likes })
          setBlogs(updatedBlogs)
    
          setNotificationMsg("Deleted succesfully")
          setIsError(false)
    
          setTimeout(() => {
            setNotificationMsg(null)
          }, 5000)
        } catch (exception) {
          setNotificationMsg('Something went wrong deleting the blog :(')
          setIsError(true)
    
          setTimeout(() => {
            setNotificationMsg(null)
            setIsError(false)
          }, 5000)
        }
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