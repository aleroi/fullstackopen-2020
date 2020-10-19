import anecdoteService from '../services/anecdotes'

export const voteAnecdote = id => {
  return async dispatch => {
    const oldAnecdote = await anecdoteService.getSingle(id)
    const updatedAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 }
    await anecdoteService.update(updatedAnecdote)

    dispatch({
      type: 'VOTE',
      data: { anecdote: updatedAnecdote }
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew({content, votes: 0})
    dispatch({
      type: 'ADD',
      data: { anecdote }
    })
  }
}


const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const updatedAnecdote = action.data.anecdote

      return state
        .map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
        .sort((a1,a2) => a2.votes - a1.votes)

        
    case 'ADD':
      return state.concat(action.data.anecdote)
    case 'INIT_ANECDOTES':
        return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer