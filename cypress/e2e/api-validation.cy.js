describe('Validação da API', () => {
  const baseUrl = 'http://localhost:3001/api/auth' // Ajuste conforme sua API
  
  it('Deve cadastrar usuário via API direta', () => {
    const timestamp = Date.now()
    const userData = {
      name: 'Usuario API Test',
      email: `apitest${timestamp}@exemplo.com`,
      password: 'senha123'
    }
    
    cy.request('POST', `${baseUrl}/register`, userData)
      .then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('message')
        expect(response.body.user.email).to.eq(userData.email)
      })
  })
  
  it('Deve validar login com usuário válido', () => {
    cy.request('POST', `${baseUrl}/login`, {
      email: 'usuario@valido.com',
      password: 'senha123'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token')
      expect(response.body).to.have.property('user')
      expect(response.body.user.email).to.eq('usuario@valido.com')
    })
  })

  it('Deve retornar erro para login com credenciais inválidas', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      body: {
        email: 'usuario@invalido.com',
        password: 'senha123' // Senha errada para este usuário
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body.message).to.contain('Email ou senha inválidos')
    })
  })
  
  it('Deve retornar erro para email duplicado', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      body: {
        name: 'Teste Duplicado',
        email: 'usuario@valido.com', // Usuário já existente
        password: 'senha123'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.message).to.contain('já cadastrado')
    })
  })

  it('Deve validar endpoint de recuperação de senha', () => {
    cy.request('POST', `${baseUrl}/forgot-password`, {
      email: 'usuario@valido.com'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.contain('Email de recuperação enviado')
    })
  })

  it('Deve retornar erro para email inexistente na recuperação', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/forgot-password`,
      body: {
        email: 'usuario@inexistente.com'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body.message).to.contain('Email não encontrado')
    })
  })
})
