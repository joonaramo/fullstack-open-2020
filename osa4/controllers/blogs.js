const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate('user', { username: 1, name: 1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogRouter.post('/', async (req, res, next) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(req.token, process.env.SECRET);
  } catch (err) {
    return next(err);
  }
  const user = await User.findById(decodedToken.id);

  if (req.body.title === undefined) {
    return res.status(400).json({ error: 'Missing title' });
  } else if (req.body.url === undefined) {
    return res.status(400).json({ error: 'Missing URL' });
  }
  const newBlog = new Blog(req.body);
  newBlog.user = user._id;
  try {
    const blog = await newBlog.save();
    user.blogs = user.blogs.concat(blog._id);
    await user.save();
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
});

blogRouter.put('/:id', async (req, res, next) => {
  if (req.body.title === undefined) {
    return res.status(400).json({ error: 'Missing title' });
  } else if (req.body.url === undefined) {
    return res.status(400).json({ error: 'Missing URL' });
  }
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('user', { username: 1, name: 1 });
    res.json(blog);
  } catch (err) {
    next(err);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const blog = await Blog.findById(req.params.id);
    if (blog.user.toString() !== decodedToken.id.toString()) {
      return res.status(401).json({
        error: 'Unauthorized',
      });
    }
  } catch (err) {
    return next(err);
  }
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
