import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`you voted ${anecdote.content}`))
    setTimeout(() => dispatch(clearNotification()), 5000);
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() =>handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList