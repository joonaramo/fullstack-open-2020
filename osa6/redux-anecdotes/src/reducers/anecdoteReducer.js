import anecdoteService from '../services/anecdotes';

const initialState = [];

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const updatedAnecdote = action.data;
      return [
        ...state.filter((anecdote) =>
          anecdote.id !== action.data.id ? anecdote : updatedAnecdote
        ),
      ];
    case 'NEW_ANECDOTE':
      const newAnecdote = action.data;
      return [...state, newAnecdote];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    anecdote.votes++;
    const updatedAnecdote = await anecdoteService.vote(anecdote);
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    });
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export default anecdoteReducer;
