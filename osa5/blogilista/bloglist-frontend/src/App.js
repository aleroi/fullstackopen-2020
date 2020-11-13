import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
//import loginService from './services/login'//
import Togglable from './components/Togglable'
import NewBlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, deleteBlog, likeBlog, initializeBlogs } from './reducers/blogsReducer'
import { tryLoginByToken, logout } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect, useRouteMatch,
} from "react-router-dom"


const Notification = ({notification}) => {
  return(
    notification !== null &&
    <p style={ {backgroundColor: 'grey'} }><b>{notification}</b></p>
  )
}



const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.user)
  const notification = useSelector(state => state.notification.text)

  const createBlogRef = React.createRef()

  useEffect(() => {
    dispatch(tryLoginByToken())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleBlogCreated = async (blog) => {
    createBlogRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blog))
      dispatch(setNotification('Blog added succesfully!'))
    } catch (error) {
      dispatch(setNotification('Something went wrong'))
    }
  }


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleBlogDeleted = async (blog) => {
    if (window.confirm(`Removing blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  }

  // Use effect hook once again to avoid memory leaks
  useEffect(() => {
    const clearNotification = () => setNotification(null)
    const timer = setTimeout(clearNotification, 5000)

    return () => clearInterval(timer)
  }, [notification])

  const padding = {
    padding: 5
  }



  return (
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {users
          ? <em>{users.name} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        }
      </div>
    <Switch>
    <Route path="/users">
      
    </Route>
    
    <Route path="/login">
    <Notification notification={notification}/>
      {
        users === null &&
      <LoginForm/>
      }
      {
        users !== null &&
        <>
          <p>{users.name} logged in <button onClick={handleLogout}>logout</button></p>
        </>
      }
        
    </Route>

    <Route path="/">
    <div>
      <h2>blog app</h2>
      <Notification notification={notification}/>
      {
        users === null &&
        <Togglable buttonLabel='login'>
          <LoginForm/>
        </Togglable>
      }
      {
        users !== null &&
        <>
          <p>{users.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='add new blog' ref={createBlogRef}>
            <NewBlogForm onBlogCreated={handleBlogCreated}></NewBlogForm>
          </Togglable>
        </>
      }

      {blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} onLike={handleLike} onDeleted={handleBlogDeleted} />
      )}
    </div>
    </Route>
    </Switch>
    </Router>
  )
}

export default App