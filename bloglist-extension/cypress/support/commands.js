// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', function ({ username, password }) {
  cy.get('[type="text"]').type(username);
  cy.get('[type="password"]').type(password);
  cy.get('[type="submit"]').click();
});

Cypress.Commands.add('createBlog', function ({ title, author, url }) {
  cy.get('button').contains('create new blog').click();

  cy.get('[name="title"]').type(title);
  cy.get('[name="author"]').type(author);
  cy.get('[name="url"]').type(url);

  cy.get('form').contains('create').click();
});

Cypress.Commands.add('createUser', function (newUser) {
  cy.request('POST', 'http://localhost:3003/api/users', newUser);
});

Cypress.Commands.add('likeBlog', function (blog) {
  cy.contains(blog).parent().find('#likeBtn').click();
});

Cypress.Commands.add('viewBlog', function (blog) {
  cy.contains(blog).parent().contains('view').click();
});
