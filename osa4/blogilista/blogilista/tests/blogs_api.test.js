const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../tests/test_helper')
const app = require('../app')
const User = require( '../models/user')
const userHelper = require('./user_test_helper')


const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Testi bloginen',
        author: 'Aleksi Roitto',
        url: 'www.hs.fi',
        likes: 2
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Testi bloginen')
})

test('set likes to 0 if there are no likes in request', async () => {
    const blogWithoutLikes = {
        title: 'Testi bloginen',
        author: 'Aleksi Roitto',
        url: 'www.hs.fi',
    }

    const response = await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .set('Authorization', `bearer ${await userHelper.getToken()}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
})

test('returns 400 if blog is missing title', async () => {
    const blogWithoutTitle = {
        author: 'Aleksi Roitto',
        url: 'www.hs.fi',
        likes: 1
    }
    await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)
})

test('returns 400 if blog is missing url', async () => {
    const blogWithoutUrl = {
        title: 'Testi bloginen',
        author: 'Aleksi Roitto',
        likes: 1    
    }
    await api
        .post('/api/blogs')
        .send(blogWithoutUrl)
        .expect(400)
})

test('can delete a blog from bloglist', async () => {
    const blogsAtStart = await helper.blogInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length -1)
    expect(blogsAtEnd.map(b => b.title)).not.toContain(blogToDelete.title)


})

test('can update a single blog', async () => {
    const blogsAtStart = await helper.blogInDb()
    const updatedBlog = blogsAtStart[0]
    updatedBlog.likes += 1

    await api
        .put(`/api/blogs/${updatedBlog.id}`)
        .send(updatedBlog)
        .expect(200)

    expect(await blogsAtStart[0]).toEqual(updatedBlog)
})

describe( 'with one existing user', async () => {
    beforeAll( async () => {
        await User.remove({})
        const user = new User({ name: 'superuser', username: 'root', password: 'secret', adult: true })
        await user.save()
    })

    test('POST /api/users with too short password fails', async () => {
        const newUser = {
            username: 'Aleksi',
            name: 'Edsger W. Dijkstra',
            password: 'a'
        }
      
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
      

    test('POST /api/users with too short username fails', async () => {
        const newUser = {
            username: 'a',
            name: 'Edsger W. Dijkstra',
            password: 'password'
        }
      
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('POST /api/users with too short username fails', async () => {
        const newUser = {
            name: 'Edsger W. Dijkstra'
        }
      
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

})






afterAll(() => {
    mongoose.connection.close()
}) 
