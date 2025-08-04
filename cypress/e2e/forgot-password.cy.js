describe('Recuperação de senha', () => {
  it('Modal para recuperação de senha', () => {
    cy.visit('http://localhost:3001/#')

    cy.get('[onclick="showForgotPassword()"]').click()
    cy.get('label[for="forgotEmail"]').click().type('reginaldo@exemplo.com')
        cy.contains('button', 'Enviar Email').click()
  })


  // Testes serão implementados manualmente
})
/*
describe('Reset Password Modal', () => {
  beforeEach(() => {
    cy.visit('/')
    // Abrir modal de reset de senha diretamente via JavaScript
    cy.window().then((win) => {
      win.showResetPassword()
    })
  })

  // Testes serão implementados manualmente
}) */