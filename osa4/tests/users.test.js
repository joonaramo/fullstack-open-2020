const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const helper = require('./test_helper');

beforeEach(async () => {
  await helper.setRootUser();
});

describe('when there is initially one user at db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe('when creating a user', () => {
  test('it should fail with username shorter than 3 characters', async () => {
    const newUser = {
      username: 'ly',
      name: 'Nimi Lyhykäinen',
      password: 'salainen',
    };

    await api.post('/api/users').send(newUser).expect(400);
  });

  test('it should fail with password shorter than 3 characters', async () => {
    const newUser = {
      username: 'lyhyt',
      name: 'Salasana Lyhykäinen',
      password: 'ly',
    };

    await api.post('/api/users').send(newUser).expect(400);
  });

  test('it should fail if username already exists', async () => {
    const newUser = {
      username: 'root',
      name: 'Root User',
      password: 'password',
    };
    await api.post('/api/users').send(newUser).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
