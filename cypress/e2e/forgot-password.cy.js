describe('Recuperação de senha', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/')
    cy.get('[onclick="showForgotPassword()"]').click()
  })

  it('Modal para recuperação de senha', () => {
    cy.get('#recoveryEmail').type('usuario@valido.com', { force: true })
    cy.contains('button', 'Enviar Email').click()
    
    // Verificar se a ação foi executada com sucesso
    cy.get('#notification', { timeout: 10000 }).should('be.visible')
      .and('contain', 'Email de recuperação enviado com sucesso')
  })

  it('Deve validar campo de email obrigatório', () => {
    cy.contains('button', 'Enviar Email').click()
    
    // Verificar se aparece mensagem de validação
    cy.get('#notification', { timeout: 5000 }).should('be.visible')
      .and('contain', 'Por favor, insira um email válido')
  })

  it('Deve validar formato de email inválido', () => {
    cy.get('#recoveryEmail').type('email-invalido', { force: true })
    cy.contains('button', 'Enviar Email').click()
    
    // Verificar validação de formato de email
    cy.get('#notification', { timeout: 5000 }).should('be.visible')
      .and('contain', 'Por favor, insira um email válido')
  })

  it('Deve exibir erro para email inexistente', () => {
    cy.get('#recoveryEmail').type('usuario@inexistente.com', { force: true })
    cy.contains('button', 'Enviar Email').click()
    
    // Verificar se aparece mensagem de erro
    cy.get('#notification', { timeout: 10000 }).should('be.visible')
      .and('contain', 'Email não encontrado')
  })
})



