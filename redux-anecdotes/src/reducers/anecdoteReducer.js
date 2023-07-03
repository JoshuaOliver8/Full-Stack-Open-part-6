import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const initialState = anecdotesAtStart
                      .map(asObject)
                      .sort((a,b) => b.votes - a.votes)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incrementVote = (id, newAnecdote) => {
  return async dispatch => {
    await anecdoteService.update(id, newAnecdote)
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.map(anecdote =>
      anecdote.id !== id ? anecdote : newAnecdote
    )
    .sort((a,b) => b.votes - a.votes)))
  }
}

export default anecdoteSlice.reducer