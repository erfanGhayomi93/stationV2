/// <reference types="cypress" />

import { queryClient } from 'src/app/queryClient';

// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('it has to visit login page', () => {
        cy.contains('ورود به سامانه معاملاتی آنلاین گروهی');
    });

    it('it has to login', () => {
        cy.get('[data-cy="username"]').type('testuser');
        cy.get('[data-cy="password"]').type('Tgs10001#');
        const captcha = queryClient.getQueryData(['Captcha']) as IGetCaptchaType;
        // captcha
        cy.contains('ورود به سامانه معاملاتی آنلاین گروهی');
    });
});
