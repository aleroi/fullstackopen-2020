
export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = (anecdote) => {
  return {
    type: 'ADD',
    data: anecdote
  }
}


const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)

      const votedAnectode = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }

      return state
        .map(a=>a.id !== id ? a : votedAnectode)
        .sort((a1,a2)=>a2.votes-a1.votes)

        
    case 'ADD':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
        return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default reducer