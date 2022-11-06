/// <reference types="cypress" />

describe('toggle sidebar', () => {
    beforeEach(() => {
        cy.login();
    });

    it('it has to open sidebar', () => {
        cy.dataCy('toggle-sider').click();
        cy.contains('اصلی');
    });
});

export {};
