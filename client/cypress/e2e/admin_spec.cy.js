/// <reference types="cypress" />


describe('Admin Page Tests', () => {
    
    it('Visits the admin page', () => {
      
        cy.visit('http://localhost:3000/admin');
        // cy.contains('Admin').should('be.visible'); 
    });
});