const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogRouter.post('/', async (req, res, next) => {
  if (req.body.title === undefined) {
    return res.status(400).json({ error: 'Missing title' });
  } else if (req.body.url === undefined) {
    return res.status(400).json({ error: 'Missing URL' });
  }
  const newBlog = new Blog(req.body);
  try {
    const blog = await newBlog.save();
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
    });
    res.json(blog);
  } catch (err) {
    next(err);
  }
});

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
