/*describe('Register Modal', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.register-link').click()
  })

  // Testes serão implementados manualmente
}) */

describe('Registrar', () => {
  it('Novo Login', () => {
    cy.visit('http://localhost:3001/#')

    cy.get('[onclick="showRegister()"]').click()
    cy.contains('h4', 'Criar Conta').should('be.visible')
    cy.get('label[for="registerName"]').click().type('Camila Lindona')
    cy.get('label[for="registerEmail"]').click().type('teste1@exemplo.com')
    cy.get('label[for="registerPassword"]').click().type('senha123')
    cy.contains('button', 'Criar Conta').click()
    cy.get('#notification').should('have.text', 'Conta criada com sucesso! Faça login para continuar.')
  })
})