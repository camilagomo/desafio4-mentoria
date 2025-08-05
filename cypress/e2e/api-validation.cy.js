describe('Validação da API', () => {
  const baseUrl = 'http://localhost:3000/api' // Ajuste conforme sua API
  
  it('Deve cadastrar usuário via API direta', () => {
    const timestamp = Date.now()
    const userData = {
      name: 'Usuario API Test',
      email: `apitest${timestamp}@exemplo.com`,
      password: 'senha123'
    }
    
    cy.request('POST', `${baseUrl}/users/register`, userData)
      .then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('message')
        expect(response.body.user.email).to.eq(userData.email)
      })
  })
  
  it('Deve validar login com usuário cadastrado', () => {
    cy.request('POST', `${baseUrl}/auth/login`, {
      email: 'reginaldo@exemplo.com',
      password: 'senha123'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token')
    })
  })
  
  it('Deve retornar erro para email duplicado', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users/register`,
      body: {
        name: 'Teste Duplicado',
        email: 'reginaldo@exemplo.com',
        password: 'senha123'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.contain('já cadastrado')
    })
  })
})
