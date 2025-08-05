describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/')
  })

  it('Deve realizar login com credenciais válidas', () => {
    // Garantir que os campos estão visíveis antes de interagir
    cy.get('#email').should('be.visible').type('usuario@valido.com', { force: true })
    cy.get('#password').should('be.visible').type('senha123', { force: true })
    cy.contains('button', 'Entrar').should('be.visible').click()
    
    // Verificar se o login foi bem-sucedido
    cy.url().should('include', 'welcome.html') // Verifica redirecionamento para página de boas-vindas
    cy.contains('Bem-vindo à Loja da Leda LTDA!').should('be.visible')
    cy.contains('Usuário Válido').should('be.visible')
    cy.contains('usuario@valido.com').should('be.visible')
  })

  it('Deve exibir erro para credenciais inválidas', () => {
    cy.get('#email').should('be.visible').type('usuario@invalido.com', { force: true })
    cy.get('#password').should('be.visible').type('senha123', { force: true }) // Senha errada para este usuário
    cy.contains('button', 'Entrar').should('be.visible').click()
    
    cy.get('#notification', { timeout: 10000 }).should('be.visible')
      .and('contain', 'Email ou senha inválidos')
  })

  it('Deve exibir erro para usuário inexistente', () => {
    cy.get('#email').should('be.visible').type('usuario@inexistente.com', { force: true })
    cy.get('#password').should('be.visible').type('senha123', { force: true })
    cy.contains('button', 'Entrar').should('be.visible').click()
    
    cy.get('#notification', { timeout: 10000 }).should('be.visible')
      .and('contain', 'Email ou senha inválidos')
  })

  it('Deve validar campos obrigatórios', () => {
    cy.contains('button', 'Entrar').should('be.visible').click()
    
    // Verificar se aparecem mensagens de validação
    cy.get('#notification', { timeout: 5000 }).should('be.visible')
      .and('contain', 'Por favor, insira um email válido')
  })

  it('Deve validar formato de email', () => {
    cy.get('#email').should('be.visible').type('email-invalido', { force: true })
    cy.get('#password').should('be.visible').type('senha123', { force: true })
    cy.contains('button', 'Entrar').should('be.visible').click()
    
    // Verificar validação de email
    cy.get('#notification', { timeout: 5000 }).should('be.visible')
      .and('contain', 'Por favor, insira um email válido')
  })

  it('Deve testar o botão Sair na página de boas-vindas', () => {
    // Fazer login primeiro
    cy.get('#email').should('be.visible').type('usuario@valido.com', { force: true })
    cy.get('#password').should('be.visible').type('senha123', { force: true })
    cy.contains('button', 'Entrar').should('be.visible').click()
    
    // Verificar se chegou na página de boas-vindas
    cy.url().should('include', 'welcome.html')
    cy.contains('Bem-vindo à Loja da Leda LTDA!').should('be.visible')
    
    // Clicar no botão Sair
    cy.contains('button', 'Sair').should('be.visible').click()
    
    // Verificar se aparece o modal de confirmação
    cy.contains('Confirmar Saída').should('be.visible')
    cy.contains('Tem certeza que deseja sair do sistema?').should('be.visible')
    
    // Clicar em "Sim, Sair"
    cy.contains('button', 'Sim, Sair').should('be.visible').click()
    
    // Verificar se voltou para a página de login
    cy.url().should('eq', 'http://localhost:3001/')
    cy.contains('Loja da Leda LTDA').should('be.visible')
  })

  it('Deve cancelar o logout no modal de confirmação', () => {
    // Fazer login primeiro
    cy.get('#email').should('be.visible').type('usuario@valido.com', { force: true })
    cy.get('#password').should('be.visible').type('senha123', { force: true })
    cy.contains('button', 'Entrar').should('be.visible').click()
    
    // Verificar se chegou na página de boas-vindas
    cy.url().should('include', 'welcome.html')
    
    // Clicar no botão Sair
    cy.contains('button', 'Sair').should('be.visible').click()
    
    // Verificar se aparece o modal de confirmação
    cy.contains('Confirmar Saída').should('be.visible')
    
    // Clicar em "Cancelar"
    cy.contains('button', 'Cancelar').should('be.visible').click()
    
    // Verificar se o modal fechou e ainda está na página de boas-vindas
    cy.contains('Confirmar Saída').should('not.exist')
    cy.url().should('include', 'welcome.html')
  })
})