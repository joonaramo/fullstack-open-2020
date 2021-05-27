import React, { useState, useEffect } from 'react';

const GenreList = ({ setGenre, books, show }) => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const genreList = [''].concat(
      Array.from(
        new Set(
          books.reduce((arr, book) => {
            return arr.concat(book.genres);
          }, [])
        )
      )
    );
    setGenres(genreList);
  }, [books]);
  if (!show) {
    return null;
  }
  return genres.map((genre) => (
    <button onClick={() => setGenre(genre)}>
      {genre === '' ? 'all genres' : genre}
    </button>
  ));
};

export default GenreList;
