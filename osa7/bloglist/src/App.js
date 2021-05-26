import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import './App.css';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Login from './components/Login';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = ({ setNotification }) => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
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

  const createBlog = async ({ title, author, url }) => {
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      blogFormRef.current.toggleVisibility();
      setNotification(
        `a new blog ${blog.title} by ${blog.author} added`,
        'success',
        5000
      );
    } catch (err) {
      setNotification(err.response.data.error, 'error', 5000);
    }
  };

  const removeBlog = async ({ id, title, author }) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      try {
        await blogService.remove(id);
        const newBlogs = blogs.filter((person) => person.id !== id);
        setBlogs(newBlogs);
        setNotification(`Removed ${title}`, 'success', 5000);
      } catch (err) {
        setNotification(err.response.data.error, 'error', 5000);
      }
    }
  };

  const likeBlog = async ({ id, user, title, author, url, likes }) => {
    try {
      const updatedBlog = {
        user: user.id,
        title,
        author,
        url,
        likes: likes + 1,
      };
      const newBlog = await blogService.update(id, updatedBlog);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : newBlog)));
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
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  );
};

const mapDispatchToProps = {
  setNotification,
};

export default connect(null, mapDispatchToProps)(App);
