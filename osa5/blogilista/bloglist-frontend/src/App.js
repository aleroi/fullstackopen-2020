import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
//import loginService from './services/login'//
import Togglable from './components/Togglable'
import NewBlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const BLOG_USER_KEY = 'blogUser'



const Notification = ({notification}) => {
  return(
    notification !== null &&
    <p style={ {backgroundColor: 'grey'} }><b>{notification}</b></p>
  )
  }

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const createBlogRef = React.createRef()

  const login = user => {
    window.localStorage.setItem(BLOG_USER_KEY, JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
  }

  const handleLogout = () => {
    window.localStorage.removeItem(BLOG_USER_KEY)
    setUser(null)
  }

  const handleBlogCreated = async (blog) => {
    createBlogRef.current.toggleVisibility()
    setBlogs(blogs.concat(blog))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(BLOG_USER_KEY)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      login(user)
    }

  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  // Use effect hook once again to avoid memory leaks
  useEffect(() => {
    const clearNotification = () => setNotification(null)
    const timer = setTimeout(clearNotification, 5000)

    return () => clearInterval(timer)
  }, [notification])


  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      {
        user === null &&
        <Togglable buttonLabel='login'>
          <LoginForm onUserLoggedIn={login} setNotification={setNotification}/>
        </Togglable>
      }
      {
        user !== null &&
        <>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='add new blog' ref={createBlogRef}>
            <NewBlogForm onBlogCreated={handleBlogCreated} setNotification={setNotification}></NewBlogForm>
          </Togglable>
        </>
      }

      {blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App