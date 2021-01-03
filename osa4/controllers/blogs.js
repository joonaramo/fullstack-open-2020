const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  if (req.body.title === undefined) {
    return res.status(400).json({ error: 'Missing title' });
  } else if (req.body.url === undefined) {
    return res.status(400).json({ error: 'Missing URL' });
  }
  const newBlog = new Blog(req.body);
  const blog = await newBlog.save();
  res.status(201).json(blog);
});

module.exports = blogRouter;
