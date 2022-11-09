/// <reference types="cypress" />

describe('watchlist flow', () => {
    before(() => {
        cy.login();
    });
    // beforeEach(() => {
    // });

    it('it has to  routes to watchlist', () => {
        cy.dataCy('Watchlist').click();
        cy.contains('دیده‌بان پیشفرض');
    });
    it('it has to  create new watchlist name cypress_test', () => {
        cy.dataCy('add-watchlist').click();
        cy.dataCy('add-watchlist-input').type('cypress_test');
        cy.cyEnter('add-watchlist-input');
    });

    it('it has to find watchlist with cypress_test title', () => {
        cy.dataCy('edit-watchlist').click();
        cy.dataCy('wl-edit-modal').should('be.visible');
        cy.contains('cypress_test');
    });

    it('it has to show uncheck all and check cypress_test', () => {
        cy.get('.data-cy-row [data-cy="wl-edit-check"]').each((el) => {
            if (el.has('checked')) {
                el.click();
            }
        });
    });
    it('it has to  edit watchlist with cypress_test to cypress_wl_test', () => {
        cy.dataCy('wl-edit-cypress_test').click();
        cy.dataCy('wl-edit-input-cypress_test')
            .type(
                '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}cypress_wl_test',
            )
            .cyEnter('wl-edit-input-cypress_test');

        cy.dataCy('wl-title-cypress_wl_test').contains('cypress_wl_test');
    });

    it('it has to close modal and select test wathclist', () => {
        cy.dataCy('wl-edit-modal-close').click();
        cy.should('not.contain', 'ویرایش');
    });

    it('it has add first default symbol to test watchlist and close modal ', () => {
        cy.wait(4000);
        cy.dataCy('add-symbol-to-watchlist').first().click();
        cy.dataCy('add-to-wl-modal').should('be.visible');
        cy.dataCy('add-symbol-btn-to-wl-cypress_wl_test').click();
        cy.dataCy('close-add-to-wl-modal').click();
    });

    it('it has to select test watchlist', () => {
        cy.dataCy('watchlist-items-cypress_wl_test').click();
        cy.dataCy('delete-symbol-from-wl').click();
    });

    it('it has to  delele watchlist wit cypress_wl_test name', () => {
        cy.dataCy('edit-watchlist').click();
        cy.dataCy('wl-edit-modal').should('be.visible');
        cy.dataCy('wl-delete-cypress_wl_test').click();
        cy.should('not.contain', 'cypress_wl_test');
    });
    it('it has to close modal and select test wathclist', () => {
        cy.dataCy('wl-edit-modal-close').click();
        cy.should('not.contain', 'ویرایش');
    });
});

export {};
