describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'John Doe',
      username: 'jdoe',
      password: 'secret',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('#username');
    cy.get('#password');
    cy.get('#login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('jdoe');
      cy.get('#password').type('secret');
      cy.get('#login').click();
      cy.contains('jdoe logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong');
      cy.get('#password').type('credentials');
      cy.get('#login').click();
      cy.contains('invalid username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'jdoe', password: 'secret' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('React Blog');
      cy.get('#author').type('Mary Poppins');
      cy.get('#url').type('https://example.com/blog');
      cy.get('#create').click();
      cy.contains('React Blog');
    });
  });
});
