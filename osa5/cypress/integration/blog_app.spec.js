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

    it('a new blog can be created', () => {
      cy.contains('new blog').click();
      cy.get('#title').type('React Blog');
      cy.get('#author').type('Mary Poppins');
      cy.get('#url').type('https://example.com/blog');
      cy.get('#create').click();
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'React Blog',
          author: 'Mary Poppins',
          url: 'https://example.com/blog',
        });
      });

      it('it can be liked', function () {
        cy.contains('view').click();
        cy.contains('React Blog').get('button').contains('like').click();
        cy.contains('likes 1');
      });

      it('can be deleted', function () {
        cy.contains('view').click();
        cy.contains('React Blog').get('button').contains('remove').click();
        cy.contains('Removed React Blog');
      });
    });
    describe('multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'React Blog',
          author: 'Mary Poppins',
          url: 'https://example.com/blog',
        });
        cy.createBlog({
          title: 'Vue Blog',
          author: 'Jack Doe',
          url: 'https://example.com/blog',
          likes: 9000,
        });
        cy.createBlog({
          title: 'Angular Blog',
          author: 'Donald Duck',
          url: 'https://example.com/blog',
          likes: 50,
        });
        cy.createBlog({
          title: 'Aku Ankan Parhaat',
          author: 'Mikki Hiiri',
          url: 'https://example.com/blog',
          likes: 100,
        });
      });
      it('they are sorted by likes', function () {
        cy.get('.blog').then((blogs) => {
          let blogLikes = 9000;
          for (let i = 0; i < blogs.length; i++) {
            cy.wrap(blogs[i]).contains('view').click();
            cy.wrap(blogs[i])
              .contains('likes')
              .then((el) => el.text())
              .then((elValue) => {
                const likes = parseInt(elValue.replace('likes ', ''));
                if (likes > blogLikes) {
                  throw new Error('blogs are not sorted');
                }
                blogLikes = likes;
              });
          }
        });
      });
    });
  });
});
