describe('Registrar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/')
    cy.get('[onclick="showRegister()"]').click()
  })

  it('Deve criar conta com dados válidos e validar chamada da API', () => {
    // Interceptar a chamada de registro para a API
    cy.intercept('POST', '**/api/auth/register', {
      statusCode: 201,
      body: {
        message: 'Conta criada com sucesso! Faça login para continuar.',
        user: {
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
    
    cy.get('#notification').should('contain', 'Conta criada com sucesso! Faça login para continuar.')
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
    cy.visit('http://localhost:3001/')
    cy.get('#email').type(uniqueEmail, { force: true })
    cy.get('#password').type('senha123', { force: true })
    cy.contains('button', 'Entrar').click()
    
    // Se conseguir fazer login, o usuário foi cadastrado
    cy.get('#notification', { timeout: 10000 }).should('contain', 'Login realizado com sucesso')
  })

  it('Deve validar campos obrigatórios', () => {
    cy.contains('button', 'Criar Conta').click()
    
    // Verificar se aparecem mensagens de validação
    cy.get('#notification', { timeout: 5000 }).should('be.visible')
      .and('contain', 'Por favor, insira um email válido')
  })

  it('Deve validar formato de email inválido', () => {
    cy.get('#registerName').type('Teste Usuario')
    cy.get('#registerEmail').type('email-invalido')
    cy.get('#registerPassword').type('senha123')
    cy.contains('button', 'Criar Conta').click()
    
    cy.get('#notification', { timeout: 5000 }).should('be.visible')
      .and('contain', 'Por favor, insira um email válido')
  })

  it('Deve exibir erro para email já cadastrado', () => {
    // Interceptar chamada que retorna erro de email duplicado
    cy.intercept('POST', '**/api/auth/register', {
      statusCode: 400,
      body: {
        message: 'Email já cadastrado'
      }
    }).as('duplicateEmailRequest')

    cy.get('#registerName').type('Outro Usuario')
    cy.get('#registerEmail').type('usuario@valido.com') // Usuário já existente
    cy.get('#registerPassword').type('senha123')
    cy.contains('button', 'Criar Conta').click()
    
    cy.wait('@duplicateEmailRequest')
    cy.get('#notification').should('contain', 'Email já cadastrado')
  })

  it('Deve validar senha com critérios mínimos', () => {
    cy.get('#registerName').type('Teste Usuario')
    cy.get('#registerEmail').type('teste@exemplo.com')
    cy.get('#registerPassword').type('12') // Senha muito curta
    cy.contains('button', 'Criar Conta').click()
    
    cy.get('#notification', { timeout: 5000 }).should('be.visible')
      .and('contain', 'A senha deve ter pelo menos 3 caracteres')
  })
})