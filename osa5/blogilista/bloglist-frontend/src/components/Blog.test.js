import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    author: 'Aleksi Roitto',
    title: 'Aleksi testiblogi',
    url: 'hs.fi',
    likes: 10,
    user: {
        name: 'Matti Luukkainen',
        username: 'mluukkai' 
    }
}

test('renders only title and author by default', () => {
    const component = render(
        <Blog blog={blog}/>
      )

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
})

test('renders also url & likes', () => {

    const component = render(
        <Blog blog={blog}/>
      )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
})

test('clicking the like button twice calls event handler twice', async () => {
    
    const blog = {
        author: 'Aleksi Roitto',
        title: 'Aleksi testiblogi',
        url: 'hs.fi',
        likes: 10,
        user: {
            name: 'Matti Luukkainen',
            username: 'mluukkai' 
        }
    }

    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} onClick={mockHandler}/>
    )
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

})