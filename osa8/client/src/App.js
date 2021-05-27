import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery, useApolloClient } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import GenreList from './components/GenreList';
import Recommended from './components/Recommended';
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(localStorage.getItem('jwt-token'));
  const [genre, setGenre] = useState('');
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS);

  const authorsResult = useQuery(ALL_AUTHORS);
  const meResult = useQuery(ME);
  const client = useApolloClient();

  useEffect(() => {
    getBooks();
    if (data && !allBooks.length > 0) {
      setAllBooks(data.allBooks);
    }
  }, [data]);

  useEffect(() => {
    if (genre) {
      getBooks({ variables: { genre } });
    } else {
      getBooks();
    }
    if (data) {
      setBooks(data.allBooks);
    }
  }, [getBooks, data, genre]);

  if (authorsResult.loading) {
    return <div>loading...</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (meResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button
          onClick={() => {
            setPage('books');
          }}
        >
          books
        </button>
        <button onClick={() => setPage('add')}>add book</button>
        <button
          onClick={() => {
            setGenre(meResult.data.me.favoriteGenre);
            setPage('recommended');
          }}
        >
          recommend
        </button>
        <button
          onClick={() => {
            setToken(null);
            localStorage.clear();
            client.resetStore();
          }}
        >
          log out
        </button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorsResult.data.allAuthors}
      />

      <Books show={page === 'books'} books={books} />
      <GenreList show={page === 'books'} books={allBooks} setGenre={setGenre} />

      <LoginForm show={page === 'add' && !token} setToken={setToken} />

      <NewBook show={page === 'add' && token} />

      <Recommended show={page === 'recommended'} books={books} />
    </div>
  );
};

export default App;
