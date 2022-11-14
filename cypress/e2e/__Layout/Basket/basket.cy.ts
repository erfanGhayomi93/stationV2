/// <reference types="cypress" />

import { basketJSON, mockJSON } from '../../../models';

context('Basket', () => {
    let basket: basketJSON | undefined;
    let mock: mockJSON | undefined;
    before(() => {
        cy.login();
        cy.fixture('basket.json').then((data: basketJSON) => {
            basket = data;
        });
        cy.fixture('mock.json').then((data: mockJSON) => {
            mock = data;
        });
    });

    describe('Basket Interaction flow', () => {
        it('it has to  routes to basket', () => {
            cy.dataCy('basket').click();
            cy.location('pathname').should('include', '/basket');
        });

        it('it has to contain basket farsi name', () => {
            cy.contains('سبد');
        });

        it('it has to expand filter box', () => {
            cy.dataCy(basket?.filter.toggleButton).click();
            cy.dataCy(basket?.filter.submitButton).should('be.visible');
        });
    });

    describe('Basket list manipulate flow', () => {
        it('it has to add new basket', () => {
            cy.dataCy(basket.top.createBasket).click();
            cy.dataCy(basket.top.createModal.inputTime).click();
            cy.dataCy(basket.top.createModal.inputDate).click();
            cy.dataCy(basket.top.createModal.inputName).type(mock?.ali.name);
            cy.dataCy(basket.top.createModal.createNewBasket).click();
            cy.dataCy(basket.top.createModal.cancelNewBasket).click();
        });
        it('it has to find added basket', () => {
            cy.dataCy(basket.top.EditBasket).click();
            cy.dataCy(basket.top.editModal.title + mock.ali.name).should('have.text', mock.ali.name);
        });
        it('it has to edit added basket', () => {
            cy.dataCy(basket.top.editModal.edit + mock.ali.name).click();
            cy.dataCy(basket.top.editModal.editInput + mock.ali.name).type('{backspace}{backspace}{backspace}' + mock.mohamad.name);
            cy.dataCy(basket.top.editModal.editSubmit + mock.ali.name).click();
        });
        it('it has to show added basket and close', () => {
            cy.dataCy(basket.top.editModal.toggle + mock.mohamad.name).click();
            cy.dataCy(basket.top.editModal.closeModal).click();
        });
    });

    // describe('Basket data Interaction flow', () => {
    //     it('it has to fill filter box and reset to default', () => {
    //         cy.dataCy(basket?.filter.inputCustomer).type(mock?.ali.name);
    //         cy.dataCy(basket?.filter.inputSymbol).type(mock?.ali.symbol);
    //         cy.dataCy(basket?.filter.defaultButton).click();
    //         cy.dataCy(basket?.filter.inputCustomer).should('not.have.value');
    //     });
    //     it('it has to fill filter and search', () => {
    //         cy.dataCy(basket?.filter.inputCustomer).type(mock?.ali.name);
    //         cy.dataCy(basket?.filter.inputSymbol).type(mock?.ali.symbol);
    //         cy.dataCy(basket?.filter.submitButton).click();
    //     });
    // });

    //delete mock data

    describe('Basket List Delete Data', () => {
        it('it has to find added basket', () => {
            cy.dataCy(basket.top.EditBasket).click();
            cy.dataCy(basket.top.editModal.delete + mock.mohamad.name).click();
        });
    });
});

export {};
