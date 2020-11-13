import blogService from '../services/blogs'

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INITIALIZE_BLOGS',
            data: { blogs }
        })
        
    }
}

export const createBlog = blog => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'ADD_BLOG',
            data: { blog: newBlog }
        })
    }
}

export const likeBlog = blog => {
    return async dispatch => {

        
        blog.likes += 1
        const resultBlog = await blogService.update(blog)
        dispatch({
            type: 'UPDATE_BLOG',
            data: { blog: resultBlog}
        })
    }
}

export const deleteBlog = blog => {
    return async dispatch => {
        await blogService.remove(blog)
        dispatch({
            type: 'DELETE_BLOG',
            data: { blog }
        })
    }
}


const blogsReducer = (state = [], action) => {
    switch (action.type) {
      case 'INITIALIZE_BLOGS':
        return action.data.blogs
      case 'ADD_BLOG':
        return state.concat(action.data.blog)
      case 'UPDATE_BLOG': 
        const updatedBlog = action.data.blog
        return state.map(a => a.id !== updatedBlog.id ? a : updatedBlog)
        .sort((a1,a2) => a2.likes - a1.likes)

      case 'DELETE_BLOG':
        let deletedBlog = action.data.blog
        return state.filter(blog => blog.id !== deletedBlog.id)
      default:
        return state
    }
  }

export default blogsReducer

