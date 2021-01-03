const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.insertMany(initialBlogs);
});

describe('get blogs', () => {
  test('correct amount of blogs are returned', async () => {
    const { body } = await api.get('/api/blogs');
    expect(body).toHaveLength(initialBlogs.length);
  });

  test('blog has field called "id"', async () => {
    const { body } = await api.get('/api/blogs');
    body.map((blog) => expect(blog.id).toBeDefined());
  });
});

describe('post blog', () => {
  test('new blog can be added', async () => {
    const newBlog = {
      title: 'Example Blog',
      author: 'John Doe',
      url: 'https://example.com/blog',
    };
    const postResp = await api.post('/api/blogs').send(newBlog);
    expect(postResp.body.title).toEqual(newBlog.title);
    expect(postResp.body.author).toEqual(newBlog.author);
    expect(postResp.body.url).toEqual(newBlog.url);
    const getResp = await api.get('/api/blogs');
    expect(getResp.body).toHaveLength(initialBlogs.length + 1);
  });

  test('if likes is not given a value, set it to 0', async () => {
    const newBlog = {
      title: 'Example Blog',
      author: 'John Doe',
      url: 'https://example.com/blog',
    };
    const { body } = await api.post('/api/blogs').send(newBlog);
    expect(body.likes).toBe(0);
  });

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'John Doe',
      url: 'https://example.com/blog',
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'Example Blog',
      author: 'John Doe',
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
