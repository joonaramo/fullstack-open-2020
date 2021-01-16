import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Login from './components/Login';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

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
      setMessage(err.response.data.error);
      setMessageType('error');
      setTimeout(() => {
        setMessage(null);
        setMessageType('');
      }, 5000);
    }
  };

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
      setMessage(err.response.data.error);
      setMessageType('error');
      setTimeout(() => {
        setMessage(null);
        setMessageType('');
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedInUser');
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={messageType} />
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
      <Notification message={message} type={messageType} />
      <p>{user.username} logged in</p>
      <button onClick={logout}>logout</button>
      <h2>create new</h2>
      <Togglable ref={blogFormRef} buttonLabel='new blog'>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
          setMessageType={setMessageType}
          blogFormRef={blogFormRef}
        />
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

export default App;
