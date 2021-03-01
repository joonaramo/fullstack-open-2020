import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import Filter from './Filter';

const AnecdoteList = ({ anecdotes, voteAnecdote, setNotification }) => {
  const vote = (anecdote) => {
    voteAnecdote(anecdote);
    setNotification(`You voted ${anecdote.content}`, 5000);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter((anecdote) => anecdote.content.includes(state.filter))
      .sort((a, b) => b.votes - a.votes),
    filter: state.filter,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
