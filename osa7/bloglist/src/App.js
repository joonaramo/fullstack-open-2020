import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import {
  getBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from './reducers/blogReducer';
import './App.css';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Login from './components/Login';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = ({
  setNotification,
  getBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
}) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogs = useSelector((state) => state.blog);

  const blogFormRef = useRef();

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (err) {
      setNotification(err.response.data.error, 'error', 5000);
    }
  };

  const handleBlogSubmit = async ({ title, author, url }) => {
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      createBlog(newBlog);
      blogFormRef.current.toggleVisibility();
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'success',
        5000
      );
    } catch (err) {
      setNotification(err.response.data.error, 'error', 5000);
    }
  };

  const handleBlogDelete = async ({ id, title, author }) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      try {
        deleteBlog(id);
        setNotification(`Removed ${title}`, 'success', 5000);
      } catch (err) {
        setNotification(err.response.data.error, 'error', 5000);
      }
    }
  };

  const handleBlogLike = async (blog) => {
    try {
      likeBlog(blog);
    } catch (err) {
      setNotification(err.response.data.error, 'error', 5000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedInUser');
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.username} logged in</p>
      <button onClick={logout}>logout</button>
      <h2>create new</h2>
      <Togglable ref={blogFormRef} buttonLabel='new blog'>
        <BlogForm createBlog={handleBlogSubmit} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={handleBlogLike}
            removeBlog={handleBlogDelete}
          />
        ))}
    </div>
  );
};

const mapDispatchToProps = {
  setNotification,
  getBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
};

export default connect(null, mapDispatchToProps)(App);
