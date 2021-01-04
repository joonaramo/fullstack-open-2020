const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const helper = require('./test_helper');

let user;

beforeEach(async () => {
  await Blog.deleteMany();
  user = await helper.setRootUser();
  const blogs = helper.initialBlogs;
  const blogsWithUser = blogs.map((blog) => ({ ...blog, user: user._id }));
  await Blog.insertMany(blogsWithUser);
});

describe('get blogs', () => {
  test('correct amount of blogs are returned', async () => {
    const { body } = await api.get('/api/blogs');
    expect(body).toHaveLength(helper.initialBlogs.length);
  });

  test('blog has field called "id"', async () => {
    const { body } = await api.get('/api/blogs');
    body.map((blog) => expect(blog.id).toBeDefined());
  });
});

describe('post blog', () => {
  let token;
  beforeEach(async () => {
    token = await helper.loginUser(user);
  });
  test('new blog can be added', async () => {
    const newBlog = {
      title: 'Example Blog',
      author: 'John Doe',
      url: 'https://example.com/blog',
    };
    const postResp = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`);
    expect(postResp.body.title).toEqual(newBlog.title);
    expect(postResp.body.author).toEqual(newBlog.author);
    expect(postResp.body.url).toEqual(newBlog.url);
    const getResp = await api.get('/api/blogs');
    expect(getResp.body).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('if likes is not given a value, set it to 0', async () => {
    const newBlog = {
      title: 'Example Blog',
      author: 'John Doe',
      url: 'https://example.com/blog',
    };
    const { body } = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`);
    expect(body.likes).toBe(0);
  });

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'John Doe',
      url: 'https://example.com/blog',
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400);
  });

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'Example Blog',
      author: 'John Doe',
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400);
  });

  test('blog without auth header is not added', async () => {
    const newBlog = {
      title: 'Example Blog',
      author: 'John Doe',
      url: 'https://example.com/blog',
    };
    await api.post('/api/blogs').send(newBlog).expect(401);
  });
});

describe('put blog', () => {
  test('should edit the fields', async () => {
    const resp = await api.get('/api/blogs');
    const firstBlogId = resp.body[0].id;
    const editedBlog = {
      id: firstBlogId,
      title: 'React Hooks',
      author: 'Mike Doe',
      url: 'https://reacthooks.com/',
      likes: 3,
    };
    const { body } = await api
      .put(`/api/blogs/${firstBlogId}`)
      .send(editedBlog);
    delete body.user;
    expect(body).toEqual(editedBlog);
  });
});

describe('delete blog', () => {
  let token;
  beforeEach(async () => {
    token = await helper.loginUser(user);
  });
  test('should delete blog', async () => {
    const respBeforeDelete = await api.get('/api/blogs');
    const firstBlogId = respBeforeDelete.body[0].id;
    await api
      .delete(`/api/blogs/${firstBlogId}`)
      .set('Authorization', `bearer ${token}`);
    const { body } = await api.get('/api/blogs');
    expect(body).toHaveLength(helper.initialBlogs.length - 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
