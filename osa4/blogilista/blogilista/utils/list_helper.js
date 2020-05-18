const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return blogs.reduce((likes, blog) => (likes+= blog.likes),0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) {
        return undefined
    }
    const firstBlog = blogs[0]

    const favoriteBlog = blogs
        .slice(1)
        .reduce((currentFavorite, blog) => 
            (blog.likes > currentFavorite.likes ? blog : currentFavorite),
        firstBlog)

    return ({
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
    })
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }

    const blogCountByAuthor = {}
    blogs.forEach(blog => {
        if (blogCountByAuthor[blog.author]){
            blogCountByAuthor[blog.author].blogs += 1
        } else {
            blogCountByAuthor[blog.author] = { author: blog.author, blogs: 1 }
        }
    })
    const authors = Object.values(blogCountByAuthor)
    return findAuthorWithMost('blogs', authors)

}

const mostLikes = (blogs) => {
    if(blogs.length === 0) {
        return undefined
    }
    const blogCountByAuthor = {}
    blogs.forEach(blog => {
        if (blogCountByAuthor[blog.author]){
            blogCountByAuthor[blog.author].likes += blog.likes
        } else {
            blogCountByAuthor[blog.author] = { author: blog.author, likes: blog.likes }
        }
    })

    const authors = Object.values(blogCountByAuthor)
    return findAuthorWithMost('likes', authors)

}

const findAuthorWithMost = (field, authors) => {
    const firstAuthor = authors[0]
    return authors
        .slice(1)
        .reduce((currentAuthorWithMost, author) =>
            (author[field] > currentAuthorWithMost[field] ? author : currentAuthorWithMost),
        firstAuthor)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}