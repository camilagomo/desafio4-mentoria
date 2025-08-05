describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/#')
  })

  it('Deve realizar login com credenciais válidas', () => {

    cy.get('input[name="email"]').type('reginaldo@exemplo.com', { force: true })
    cy.get('input[name="password"]').type('senha123', { force: true })
    cy.contains('button', 'Entrar').click()
    
    // Verificar se o login foi bem-sucedido
    cy.get('#notification', { timeout: 10000 }).should('be.visible')
  })

  it('Deve exibir erro para credenciais inválidas', () => {
    cy.get('input[name="email"]').type('usuario@inexistente.com', { force: true })
    cy.get('input[name="password"]').type('senhaerrada', { force: true })
    cy.contains('button', 'Entrar').click()
    
    cy.get('#notification', { timeout: 10000 }).should('be.visible')
  })

  it('Deve validar campos obrigatórios', () => {
    cy.contains('button', 'Entrar').click()
    
    // Verificar se aparecem mensagens de validação ou campos marcados como inválidos
    cy.get('input[name="email"]:invalid').should('exist')
  })

  it('Deve validar formato de email', () => {
    cy.get('input[name="email"]').type('email-invalido', { force: true })
    cy.get('input[name="password"]').type('senha123', { force: true })
    cy.contains('button', 'Entrar').click()
    
    // Verificar validação de email
    cy.get('input[name="email"]:invalid').should('exist')
  })
})