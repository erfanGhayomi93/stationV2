/// <reference types="cypress" />

describe('toggle sidebar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001');
    });

    it('it has to open sidebar', () => {
        cy.get('[data-cy="toggle-sider"]').click();
        cy.contains('expanded-sider');
    });
});
