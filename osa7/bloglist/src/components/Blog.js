import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, removeBlog, likeBlog }) => {
  const [show, setShow] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'view'}</button>
      {show && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes <span className='likes'>{blog.likes}</span>
          </div>
          <button onClick={() => likeBlog(blog)}>like</button>
          <div>{blog.user.username}</div>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
};

export default Blog;
