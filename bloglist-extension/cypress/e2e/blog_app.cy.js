describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    cy.createUser({
      username: 'tester',
      name: 'flen fouleni',
      password: 'fouleni-test',
    });

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.get('[type="text"]');
    cy.get('[type="password"]');
    cy.get('[type="submit"]').contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'tester', password: 'fouleni-test' });
      cy.contains('flen fouleni logged in');
    });

    it('fails with wrong credentials', function () {
      cy.login({ username: 'tester', password: 'wrong password' });
      cy.contains('wrong username or password', { timeout: 10000 }).should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      );
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester', password: 'fouleni-test' });
      cy.contains('flen fouleni logged in');
      cy.createBlog({
        title: 'new blog',
        author: 'new author',
        url: 'www.new-url.com',
      });
    });

    it('A blog can be created', function () {
      cy.get('.success', { timeout: 10000 }).should(
        'have.css',
        'color',
        'rgb(0, 128, 0)'
      );

      cy.contains('new blog new author').parent().as('newBlog');
      cy.get('@newBlog').contains('view').click();

      cy.get('@newBlog').contains('www.new-url.com');
      cy.get('.details').contains('likes');
      cy.get('.details').contains('flen fouleni');
    });

    it('A blog can be liked', function () {
      cy.viewBlog('new blog new author');
      cy.likeBlog('new blog new author');

      cy.get('.details').contains('likes: 1');
    });

    it('A blog can be deleted by its creator', function () {
      cy.contains('new blog new author').parent().contains('view').click();

      cy.get('.details').find('#removeBtn').click();

      cy.contains('new blog new author').should('not.exist');
    });

    it('A blog can ONLY be deleted by its creator', function () {
      cy.contains('new blog new author').parent().contains('view').click();

      cy.get('.details').find('#removeBtn');

      cy.get('button').contains('logout').click();

      cy.createUser({
        username: 'anotheruser',
        name: 'user 2',
        password: 'anotheruser',
      });

      cy.login({ username: 'anotheruser', password: 'anotheruser' });

      cy.contains('new blog new author').parent().contains('view').click();

      cy.contains('new blog new author')
        .parent()
        .find('#removeBtn')
        .should('not.exist');
    });

    it('blogs are sorted by descending likes', function () {
      cy.createBlog({
        title: 'least liked blog',
        author: 'new author',
        url: 'www.new-url.com',
      });

      cy.createBlog({
        title: 'most liked blog',
        author: 'new author',
        url: 'www.new-url.com',
      });

      cy.viewBlog('new blog new author');
      cy.viewBlog('most liked blog new author');
      cy.viewBlog('least liked blog new author');

      //1 like
      cy.likeBlog('least liked blog new author');

      //2 likes
      cy.likeBlog('new blog new author');
      cy.likeBlog('new blog new author');

      //3 likes
      cy.likeBlog('most liked blog new author');
      cy.likeBlog('most liked blog new author');
      cy.likeBlog('most liked blog new author');

      cy.get('.blog').eq(0).should('contain', 'most liked blog');
      cy.get('.blog').eq(1).should('contain', 'new blog');
      cy.get('.blog').eq(2).should('contain', 'least liked blog');
    });
  });
});
