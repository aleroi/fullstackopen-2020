import React, { useState } from 'react'



const Blog = ({blog, onLike, onDeleted}) => {
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
        <div> {blog.likes} likes <button onClick={() => onLike(blog)}>like</button></div>
        <div><button onClick={() => onDeleted(blog)}>remove</button></div>
      </div>
    </div>
    
    
  )
}

export default Blog