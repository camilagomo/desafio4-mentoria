# Sistema de Autenticação - Loja da Leda LTDA

Sistema completo com API REST, interface web e testes automatizados.

## 👥 Integrantes
- **Camila Monteiro** - Backend e Frontend
- **Leda Pires** - Backend e Testes

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Subir a API
```bash
# Desenvolvimento
npm run dev

```
API disponível em: `http://localhost:3001`

### 3. Acessar a Página Web
Após subir a API, acesse:
```
http://localhost:3001
```

### 4. Usuários de Teste
O sistema inclui usuários pré-cadastrados para teste:

**✅ Usuário Válido:**
- Email: `usuario@valido.com`
- Senha: `senha123`

**❌ Usuário Inválido:**
- Email: `usuario@invalido.com`
- Senha: `senha_errada`

### 5. Rodar Automação Cypress
```bash
# Abrir Cypress visual
npm run cypress:open

# Executar testes
npm run test:e2e
```

### 6. Testes da API
```bash
npm run test:api
```

## 🔄 GitHub Actions

O projeto possui uma pipeline CI/CD que valida automaticamente:

- ✅ **Testes E2E com Cypress** - Valida funcionalidades da interface
- ✅ **Alertas para Pull Requests** - Notifica sobre novos PRs
- ✅ **Alertas de Erro** - Notifica quando testes falham
- ✅ **Alertas de Sucesso** - Notifica quando todos os testes passam
- ✅ **Artefatos** - Gera vídeos e screenshots dos testes

### 📊 O que é validado:

- **Login com credenciais válidas**
- **Login com credenciais inválidas** 
- **Logout com confirmação**
- **Validação de formulários**
- **Responsividade da interface**
- **Navegação entre páginas**
- **Funcionalidades de cache**

## 📋 Endpoints da API

- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Recuperar senha
- `POST /api/auth/reset-password` - Redefinir senha
- `POST /api/auth/register` - Registrar usuário
- `GET /api/auth/status` - Status da conta

## 🛠️ Tecnologias

**Backend:** Node.js, Express, Swagger
**Frontend:** HTML5, CSS3, JavaScript, MaterializeCSS
**Testes:** Jest, Mocha/Chai, Cypress
**CI/CD:** GitHub Actions

 
