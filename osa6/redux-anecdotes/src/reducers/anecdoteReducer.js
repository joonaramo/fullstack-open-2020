const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = [];

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      const { id } = action.data;
      const foundAnecdote = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...foundAnecdote,
        votes: foundAnecdote.votes + 1,
      };
      return [
        ...state.map((anecdote) =>
          anecdote.id !== id ? anecdote : changedAnecdote
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

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  };
};

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote,
  };
};

export default anecdoteReducer;
