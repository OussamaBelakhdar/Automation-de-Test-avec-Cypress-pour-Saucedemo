/// <reference types="cypress" />

describe('Add/remove product to cart on saucedemo', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/')
      cy.get('[data-test="username"]').type('standard_user'),
        cy.get('[data-test="password"]').type('secret_sauce'),
        cy.get('[data-test="login-button"]').click()
    })
  
    it('adding one product', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
      cy.get('.shopping_cart_badge')
        .invoke('text')
        .then(text => {
          const currentCount = parseInt(text) || 0
          cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
          cy.get('.shopping_cart_badge').should('be.visible')
          cy.get('.shopping_cart_badge')
            .invoke('text')
            .then(text => {
              const newCount = parseInt(text) || 0
              expect(newCount).to.equal(currentCount + 1)
              cy.get('[data-test="remove-sauce-labs-backpack"]').should(
                'be.visible'
              )
              cy.percySnapshot()
            })
        })
    })
    it('removing one product', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('.shopping_cart_badge')
        .invoke('text')
        .then(text => {
          const currentCount = parseInt(text) || 0
          cy.get('[data-test="remove-sauce-labs-backpack"]').click()
          cy.get('.shopping_cart_badge').should('be.visible')
          cy.get('.shopping_cart_badge')
            .invoke('text')
            .then(text => {
              const newCount = parseInt(text) || 0
              expect(newCount).to.equal(currentCount - 1)
              cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should(
                'be.visible'
              )
              cy.percySnapshot()

            })
        })
    })
  })