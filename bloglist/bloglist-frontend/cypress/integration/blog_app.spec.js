/// <reference types="cypress" />

describe('Blog app', function () {
  beforeEach(function () {
    // Reset database via backend api call
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    // Create a test user
    const user = {
      name: 'Matti Luukkainen',
      password: 'salainen',
      username: 'mluukkai',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.get('form#login').should('be.visible');
    cy.get('#username-input').should('be.visible');
    cy.get('#password-input').should('be.visible');
    cy.get('#login-nav').should('be.visible');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type('mluukkai');
      cy.get('#password-input').type('salainen');
      cy.get('#submit-login').click();

      // After successful login
      cy.get('#account-button').click();
      cy.get('#account-menu ul').within(() => {
        cy.contains('Matti Luukkainen');
        cy.contains('Logout');
      });
    });

    it('fails with wrong credentials', function () {
      cy.get('#username-input').type('mluukkai');
      cy.get('#password-input').type('incorrectPassword');
      cy.get('#submit-login').click();

      cy.get('#message').should('contain', 'invalid username or password');
      cy.get('html').should('not.contain', '#account-button');
    });
  });

  describe('When user is logged in', function () {
    beforeEach(function () {
      // Log in user with created command
      cy.login({ username: 'mluukkai', password: 'salainen' });
    });

    it('a new blog can be created', function () {
      cy.get('#nav-routes').contains('Blogs').click();
      cy.contains('NEW BLOG').click();
      cy.get('input#title').type('Test blog');
      cy.get('input#author').type('author cypress');
      cy.get('input#url').type('www.cypress.com');
      cy.get('#create-button').click();
      cy.get('#message').contains('"Test blog" was created successfully!');
    });

    describe('and 3 blogs have been added', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'First blog',
          author: 'Author 1',
          url: 'www.test1.com',
        });
        cy.createBlog({
          title: 'Second blog',
          author: 'Author 2',
          url: 'www.test2.com',
        });
        cy.createBlog({
          title: 'Third blog',
          author: 'Author 3',
          url: 'www.test3.com',
        });

        cy.visit('http://localhost:3000/blogs');
      });

      it('a blog can be liked', function () {
        // Get the First blog
        cy.contains('First blog').click();

        // Likes are 0 by default
        cy.contains('.blog-likes', '0');
        cy.get('#like-button').click();
        // Likes have been increased to 1
        cy.contains('.blog-likes', '1');
        cy.get('#message').contains('"First blog" liked!');
      });

      it('the blogs will be sorted by likes', function () {
        // The Third blog will get 2 likes
        cy.contains('Third blog').click();
        // Click Like button 2 times
        cy.get('#like-button').click();
        cy.contains('.blog-likes', '1');
        cy.get('#like-button').click();
        cy.contains('.blog-likes', '2');

        // Go back to Blogs list
        cy.get('#nav-routes').contains('Blogs').click();

        // The First blog will get 1 like
        // The Third blog will get 2 likes
        cy.contains('First blog').click();
        // Click Like button 2 times
        cy.get('#like-button').click();
        cy.contains('.blog-likes', '1');

        // Go back to Blogs list
        cy.get('#nav-routes').contains('Blogs').click();

        // Third blog must be on first, next First blog
        cy.get('.bloglist-card').eq(0).should('contain', 'Third blog');
        cy.get('.bloglist-card').eq(1).should('contain', 'First blog');
      });

      it('a blog can be removed by the person who created it', function () {
        cy.contains('Second blog').click();

        cy.get('#more-button').click();
        cy.get('#blog-menu ul').should('contain', 'Delete').click();

        // Expect a Confirm and accept it
        cy.on('window:confirm', (text) => {
          expect(text).to.contains(
            'Are you sure you want to delete this blog?',
          );
        });

        // Second blog should not appear
        cy.get('#bloglist').should('not.contain', 'Second blog');
        cy.get('#message').contains('"Second blog" deleted');
      });

      it('a blog cannot be deleted if the person did not create it', function () {
        // Logout current user
        cy.get('#account-button').click();
        cy.get('#account-menu ul').within(() => {
          cy.contains('Logout').click();
        });

        // Create another user
        const user = {
          name: 'John Smith',
          username: 'johnsmith',
          password: 'smith',
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user);

        // Login with the new user
        cy.login({ username: 'johnsmith', password: 'smith' });

        // Go to a blog
        cy.contains('First blog').click();

        // The blog previously created should not have the "More" button
        cy.get('.container').should('not.contain', '#more-button');
      });
    });
  });
});
