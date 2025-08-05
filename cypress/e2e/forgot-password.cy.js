describe('Recuperação de senha', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/#')
    cy.get('[onclick="showForgotPassword()"]').click()
  })

  it('Modal para recuperação de senha', () => {
    cy.get('#forgotEmail').type('reginaldo@exemplo.com', { force: true })
    cy.contains('button', 'Enviar Email').click()
    
    // Verificar se a ação foi executada com sucesso
    cy.get('#notification', { timeout: 10000 }).should('be.visible')
  })

  it('Deve validar campo de email obrigatório', () => {
    cy.contains('button', 'Enviar Email').click()
    
    // Verificar se o campo é marcado como inválido ou há mensagem de erro
    cy.get('#forgotEmail:invalid').should('exist')
  })

  it('Deve validar formato de email inválido', () => {
    cy.get('#forgotEmail').type('email-invalido', { force: true })
    cy.contains('button', 'Enviar Email').click()
    
    // Verificar validação de formato de email
    cy.get('#forgotEmail:invalid').should('exist')
  })
})



