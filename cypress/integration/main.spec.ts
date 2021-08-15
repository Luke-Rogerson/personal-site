it('should render the home page properly', () => {
  cy.visit('/')
  cy.contains('Luke Rogerson')
  cy.contains('Full-stack software engineer ☁️')
  // profile pic
  cy.get('[alt="Luke Rogerson"]')
    .should('be.visible')
    .and($img => {
      // "naturalWidth" and "naturalHeight" are set when the image loads
      expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0)
    })
  cy.get('[data-cy="contact-section"]')
    .should('be.visible')
    .children()
    .should('have.length', 4)
  cy.get('[data-cy="blog-icon"]').click()
})

it('should render the blog list page correctly', () => {
  cy.visit('/blog')
  cy.contains('Luke Rogerson')
  cy.get('[alt="Luke Rogerson"]')
    .should('be.visible')
    .and($img => {
      expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0)
    })
  cy.get('h3').should('have.length.above', 11)
  cy.get('p').should('have.length.above', 11)
  cy.get('a')
    .contains(
      'Running and debugging Serverless Framework Python Lambda functions locally in VSCode'
    )
    .click()
})

it('should render an individual blog post properly', () => {
  cy.visit('/blog/debug-serverless-framework-python-lambdas/')
  cy.get('h1').contains(
    'Running and debugging Serverless Framework Python Lambda functions locally in VSCode'
  )
  cy.get('p').contains('27 July , 2021')
  cy.get('[data-cy="blog-post-content"]').should('be.visible')
  cy.get('[data-cy="blog-home-link"]').should('be.visible')
  cy.get('[data-cy="blog-previous-link"]').should('be.visible')
})

it('should be able to navigate from a blog post properly', () => {
  cy.visit('/blog/debug-serverless-framework-python-lambdas/')
  cy.get('[data-cy="blog-home-link"]').click()
  cy.contains('Full-stack software engineer ☁️')
  cy.go('back')
  cy.get('[data-cy="blog-previous-link"]').click()
  cy.get('h1').contains(
    'Search all tables for value, search all tables for column name (PostgreSQL)'
  )
})
