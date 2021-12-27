import {email, password} from '../../fixtures/auth-user.json';

describe('The Login Page', () => {
  it('should login with user and password', () => {
    cy.viewport(1920, 1080)
    // Start from the index page
    cy.visit('https://musichook.vercel.app/auth/signin')
    cy.contains('Sign in with email').click();
    cy.get('input[type=email]').type(email); 
    cy.get('button[type=submit]').click(); 
    //cy.contains('NEXT').click();
    cy.get('input[type=password]').type('test123456'); 
    //cy.contains('SAVE').click();
    cy.get('button[type=submit]').click(); 

    //
    cy.get('a[href*="/profile"]').click({ multiple: true });
    //cy.get('div');
    cy.url().should('include', '/profile');

    cy.wait(4000);
    cy.get('#test').click();

    cy.get('a[href*="/auth/signin"]').click({ multiple: true });
    
  })
})