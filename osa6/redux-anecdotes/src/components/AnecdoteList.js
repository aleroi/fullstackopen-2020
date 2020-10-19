import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import anecdotes from '../services/anecdotes'

const AnecdoteList = (props) => {


  const handleVote = (anecdote) => {
    props.voteAnecdote(anecdote.id)
    props.setNotification(`you voted ${anecdote.content}`, 5)
  }

  console.log(anecdotes)
  return (
    <div>
      {props.anecdotes.map(anecdote =>
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


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}
const mapDispatchToProps = {
  voteAnecdote, setNotification
}

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default connectedAnecdoteList