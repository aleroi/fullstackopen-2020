import React, { useState } from 'react'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'


const NewBlogForm = ({ onBlogCreated }) => {

  const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
  
    const handleSubmit = async (event) => {
      event.preventDefault()
      try {
        const blog = await blogService.create({ title, author, url })
  
        setTitle('')
        setAuthor('')
        setUrl('')
        onBlogCreated(blog)
        dispatch(setNotification('Blog added!'))
      } catch (error) {
        dispatch(setNotification('Something went wrong, blog was not added'))
      }
    }
  
    return (
      <>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>title:
            <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}/>
          </div>
          <div>author:
            <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}/>
          </div>
          <div>url:
            <input
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}/>
          </div>
          <button type="submit">create</button>
  
        </form>
      </>
    )
  }

  export default NewBlogForm