const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../../src/server');

chai.use(chaiHttp);

describe('API de Autenticação - Loja da Leda LTDA', () => {
  describe('GET /health', () => {
    it('deve retornar status 200', (done) => {
      chai.request(app)
        .get('/health')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status', 'OK');
          done();
        });
    });
  });

  describe('POST /api/auth/login', () => {
    it('deve fazer login com sucesso', (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .send({
          email: 'usuario@exemplo.com',
          password: 'senha123'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('deve retornar erro com credenciais inválidas', (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .send({
          email: 'usuario@exemplo.com',
          password: 'senha_errada'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe('POST /api/auth/forgot-password', () => {
    it('deve solicitar recuperação de senha', (done) => {
      chai.request(app)
        .post('/api/auth/forgot-password')
        .send({
          email: 'usuario@exemplo.com'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });

  describe('POST /api/auth/register', () => {
    it('deve registrar novo usuário', (done) => {
      chai.request(app)
        .post('/api/auth/register')
        .send({
          name: 'Novo Usuário',
          email: 'novo@exemplo.com',
          password: 'senha123'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('user');
          done();
        });
    });
  });

  describe('GET /api/auth/status/:email', () => {
    it('deve retornar status da conta', (done) => {
      chai.request(app)
        .get('/api/auth/status/usuario@exemplo.com')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          done();
        });
    });
  });
}); 