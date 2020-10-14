import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = props => {

  const dispatch = useDispatch()

  const handleAddAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.data.value
    event.target.data.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
    dispatch(setNotification(`you added ${content}`))
    setTimeout(()=>clearNotification(), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div><input name='data' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm 