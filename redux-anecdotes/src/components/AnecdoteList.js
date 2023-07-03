import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => {
        if ( state.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const vote = async (id) => {
        const oldAnecdote = await anecdotes.find(anecdote => anecdote.id === id)
        const newAnecdote = {...oldAnecdote, votes: oldAnecdote.votes + 1}
        dispatch(incrementVote(id, newAnecdote))

        dispatch(setNotification(`you voted '${newAnecdote.content}'`, 10))
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList