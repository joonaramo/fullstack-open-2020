import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, setBlogs, setMessage, setMessageType, blogs }) => {
  const [show, setShow] = useState(false);

  const removeBlog = async ({ id, title, author }) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      try {
        await blogService.remove(id);
        const newBlogs = blogs.filter((person) => person.id !== id);
        setBlogs(newBlogs);
        setMessage(`Removed ${title}`);
        setMessageType('success');
        setTimeout(() => {
          setMessage(null);
          setMessageType('');
        }, 5000);
      } catch (err) {
        setMessage(err.response.data.error);
        setMessageType('error');
        setTimeout(() => {
          setMessage(null);
          setMessageType('');
        }, 5000);
      }
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title}{' '}
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'view'}</button>
      {show && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}</div>
          <div>{blog.author}</div>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
