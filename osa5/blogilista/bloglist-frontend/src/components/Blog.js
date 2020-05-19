import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, onLike}) => {
  const [detailed, setDetailed] = useState(false)
 

  const buttonText = () => (detailed === true ? 'hide' : 'view')
  const allDetails = { display: detailed ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = async event => {
    event.preventDefault()
    const likes = blog.likes + 1
    const newBlog = { ...blog, likes }
    await blogService.update(blog.id, newBlog)
    onLike(newBlog)
  }
  
  return (
    <div style={blogStyle}>
      <div className="blogTitle">
        <b>{blog.title}</b> {blog.author}
        <button id="view" onClick={() => setDetailed(!detailed)}>
          {buttonText()}
        </button>
      </div>
      <div style={allDetails} className="allDetails">
        <div>{blog.url}</div>
        <div onClick={like}>{blog.likes} likes<button type="submit">like</button></div>
      </div>
    </div>
    
    
  )
}

export default Blog