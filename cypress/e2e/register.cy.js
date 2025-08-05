describe('Registrar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/#')
    cy.get('[onclick="showRegister()"]').click()
  })

  it('Deve criar conta com dados válidos e validar chamada da API', () => {
    // Interceptar a chamada de registro para a API
    cy.intercept('POST', '**/api/users/register', {
      statusCode: 201,
      body: {
        message: 'Usuário cadastrado com sucesso',
        user: {
          id: 1,
          name: 'Camila Lindona',
          email: 'camilalinda@exemplo.com'
        }
      }
    }).as('registerRequest')

    cy.contains('h4', 'Criar Conta').should('be.visible')
    cy.get('#registerName').type('Camila Lindona')
    cy.get('#registerEmail').type('camilalinda@exemplo.com')
    cy.get('#registerPassword').type('senha123')
    cy.contains('button', 'Criar Conta').click()
    
    // Verificar se a API foi chamada com os dados corretos
    cy.wait('@registerRequest').then((interception) => {
      expect(interception.request.body).to.deep.include({
        name: 'Camila Lindona',
        email: 'camilalinda@exemplo.com',
        password: 'senha123'
      })
    })
    
    cy.get('#notification').should('have.text', 'Conta criada com sucesso! Faça login para continuar.')
  })

  it('Deve testar registro real com a API (sem mock)', () => {
    // Usar timestamp para garantir email único
    const timestamp = Date.now()
    const uniqueEmail = `usuario${timestamp}@exemplo.com`
    
    cy.contains('h4', 'Criar Conta').should('be.visible')
    cy.get('#registerName').type('Usuario Teste', { force: true })
    cy.get('#registerEmail').type(uniqueEmail, { force: true })
    cy.get('#registerPassword').type('senha123', { force: true })
    cy.contains('button', 'Criar Conta').click()
    
    // Verificar resposta da API real
    cy.get('#notification', { timeout: 10000 }).should('contain', 'sucesso')
    
    // Validar que o usuário foi realmente criado fazendo login
    cy.visit('http://localhost:3001/#')
    cy.get('input[name="email"]').type(uniqueEmail, { force: true })
    cy.get('input[name="password"]').type('senha123', { force: true })
    cy.contains('button', 'Entrar').click()
    
    // Se conseguir fazer login, o usuário foi cadastrado
    cy.get('#notification', { timeout: 10000 }).should('contain', 'Login realizado com sucesso')
  })

  it('Deve validar campos obrigatórios', () => {
    cy.contains('button', 'Criar Conta').click()
    
    cy.contains('Nome é obrigatório').should('be.visible')
    cy.contains('Email é obrigatório').should('be.visible')
    cy.contains('Senha é obrigatória').should('be.visible')
  })

  it('Deve validar formato de email inválido', () => {
    cy.get('#registerName').type('Teste Usuario')
    cy.get('#registerEmail').type('email-invalido')
    cy.get('#registerPassword').type('senha123')
    cy.contains('button', 'Criar Conta').click()
    
    cy.contains('Formato de email inválido').should('be.visible')
  })

  it('Deve exibir erro para email já cadastrado', () => {
    // Interceptar chamada que retorna erro de email duplicado
    cy.intercept('POST', '**/api/users/register', {
      statusCode: 400,
      body: {
        error: 'Email já cadastrado'
      }
    }).as('duplicateEmailRequest')

    cy.get('#registerName').type('Outro Usuario')
    cy.get('#registerEmail').type('reginaldo@exemplo.com')
    cy.get('#registerPassword').type('senha123')
    cy.contains('button', 'Criar Conta').click()
    
    cy.wait('@duplicateEmailRequest')
    cy.get('#notification').should('contain', 'Email já cadastrado')
  })

  it('Deve validar senha com critérios mínimos', () => {
    cy.get('#registerName').type('Teste Usuario')
    cy.get('#registerEmail').type('teste@exemplo.com')
    cy.get('#registerPassword').type('123') // Senha muito curta
    cy.contains('button', 'Criar Conta').click()
    
    cy.contains('Senha deve ter pelo menos 6 caracteres').should('be.visible')
  })
})