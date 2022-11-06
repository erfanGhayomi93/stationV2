/// <reference types="cypress" />

describe('Login', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('it has to visit login page', () => {
        cy.contains('ورود به سامانه معاملاتی آنلاین گروهی');
    });

    it('it has to login', () => {
        cy.get('[data-cy="username"]').type('testuser');
        cy.get('[data-cy="password"]').type('Tgs10001#');
        // captcha
        cy.contains('ورود به سامانه معاملاتی آنلاین گروهی');
    });
});