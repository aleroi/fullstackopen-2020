const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
         __v: 0
        },
        {
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0
        },
        {
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
        },
        {
			_id: "5a422b891b54a676234d17fa",
			title: "First class tests",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
			likes: 10,
			__v: 0
        },
        {
			_id: "5a422ba71b54a676234d17fb",
			title: "TDD harms architecture",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
			likes: 0,
			__v: 0
        },
        {
			_id: "5a422bc61b54a676234d17fc",
			title: "Type wars",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
			likes: 2,
			__v: 0
		}
    ]
describe('total likes', () => {

    test('of list with one blog equals to likes of the blog', () => {
        const result = listHelper.totalLikes([blogs[0]])
        expect(result).toBe(7)
    })

    test('of list with multiple blogs is calculated correctly', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36)
    })

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
})

describe('favourite blog', () => {

    const blogWithMostLikes = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
    }
  
    test('of empty list is undefined', () => {
        expect(listHelper.favoriteBlog([])).toBe(undefined)
    })
  
    test('of list with one blog equals to the blogWithMostLikes', () => {
        expect(listHelper.favoriteBlog([blogs[2]])).toEqual(blogWithMostLikes)
    })
  
    test('of list with multiple blogs is the one with most likes', () => {
        expect(listHelper.favoriteBlog(blogs)).toEqual(blogWithMostLikes)
    })
})

describe('most blogs', () => {

    test('of empty list is undefined', () => {
        expect(listHelper.mostBlogs([])).toBe(undefined)
    })

    test('of list with one blog returns the authorOfOneBlog', () => {

        const authorOfOneBlog = {
            author: 'Michael Chan',
            blogs: 1
        }
        expect(listHelper.mostBlogs([blogs[0]])).toEqual(authorOfOneBlog)
    })

    test('of list with most blogs is correct', () => {

        const authorWithMostBlogs = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        expect(listHelper.mostBlogs(blogs)).toEqual(authorWithMostBlogs)
    })

})   

describe('most likes', () => {

    test('of empty list is undefined', () => {
        expect(listHelper.mostLikes([])).toBe(undefined)
    })

    test('of list with one blog returns the author of the single blog', () => {

        const authorOfSingleBlog = {
            author: 'Michael Chan',
            likes: 7
        }

        expect(listHelper.mostLikes([blogs[0]])).toEqual(authorOfSingleBlog)
    })

    test('of list with multiple bloggers returns the author with most likes', () => {

        const authorWithMostLikes = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }

        expect(listHelper.mostLikes(blogs)).toEqual(authorWithMostLikes)
    })

})