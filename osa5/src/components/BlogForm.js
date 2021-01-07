import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({
  blogs,
  setBlogs,
  setMessage,
  setMessageType,
  blogFormRef,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      setTitle('');
      setAuthor('');
      setUrl('');
      blogFormRef.current.toggleVisibility();
      setMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setMessageType('success');
      setTimeout(() => {
        setMessage(null);
        setMessageType('');
      }, 5000);
    } catch (err) {
      setMessage(err.response.data.error);
      setMessage('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type='text'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  );
};

export default BlogForm;
