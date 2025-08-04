/*describe('Login', () => {
  beforeEach(() => {
    //Arrange
    cy.visit('http://localhost:3001/#')
  })

  // Testes serão implementados manualmente
})*/

describe('Login', () => {
  it('Acessando o Login', () => {
    cy.visit('http://localhost:3001/#')
    cy.get('label[for="email"]').click().type('reginaldo@exemplo.com')
    cy.get('label[for="password"]').click().type('senha123')
        cy.contains('button', 'Entrar').click()
  })

  //cy.get('#notification')
})