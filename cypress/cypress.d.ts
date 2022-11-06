// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        login(): Chainable<any>;
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
         */
        dataCy<E extends Node = HTMLElement>(value: string): Chainable<JQuery<E>>;
        cyEnter(value: string): void;
    }
}
