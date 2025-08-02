<<<<<<< HEAD
# Sistema com Interface Web e Testes Automatizados com Cypress
=======
# Sistema Interface Web e Testes Automatizados com Cypress
>>>>>>> 8ecc871 (adiciona imagem do prototipo)

Projeto completo desenvolvido com **API REST** para autenticação de usuários, **interface web moderna** e **testes automatizados com Cypress**. O sistema inclui controle de tentativas de login, bloqueio de conta, recuperação de senha e uma página web responsiva para interação com os endpoints.

## 🚀 Funcionalidades

### API Backend
- ✅ Login com sucesso
- ✅ Login inválido
- ✅ Bloquear senha após 3 tentativas
- ✅ Recuperação de senha (lembrar senha)
- ✅ Registro de novo usuário
- ✅ Desbloqueio de conta
- ✅ Documentação Swagger integrada

### Interface Web
- ✅ Tela de login responsiva WEB e Mobile
- ✅ Modais para registro e recuperação de senha
- ✅ Notificações visuais de sucesso/erro
- ✅ Framework MaterializeCSS para UI 

### 📸 Preview da Interface

![Tela de Login - Loja da Leda LTDA](image.png)

### Testes Automatizados
- ✅ Testes E2E com Cypress
- ✅ Testes de API com Mocha, Chai e Supertest
- ✅ Testes simples e diretos
- ✅ Relatórios Mocha Awesome
- ✅ Pipeline CI/CD com GitHub Actions

## Funcionalidades

- ✅ Login com sucesso
- ✅ Login inválido
- ✅ Bloquear senha após 3 tentativas
- ✅ Recuperação de senha (lembrar senha)
- ✅ Registro de novo usuário
- ✅ Desbloqueio de conta
- ✅ Documentação Swagger integrada

## 👥 Integrantes do Grupo

- **Camila Monteiro** - Desenvolvimento Backend e Frontend
- **Leda Pires** - Desenvolvimento Backend e Testes

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## 🚀 Como Executar o Projeto

### 1. Subir a API

#### Desenvolvimento (com hot reload):
```bash
npm run dev
```

#### Produção:
```bash
npm start
```

A API estará disponível em: `http://localhost:3001`

### 2. Acessar a Página Web

Após subir a API, acesse no navegador:
```
http://localhost:3001
```

Você verá a tela de login da **Loja da Leda LTDA** com:
- Formulário de login
- Opção para criar nova conta
- Recuperação de senha
- Design responsivo 

### 3. Testar as Automações com Cypress

#### Instalar dependências (se ainda não instalou):
```bash
npm install
```

#### Abrir Cypress em modo visual:
```bash
npm run cypress:open
```

#### Executar testes em linha de comando:
```bash
npm run test:e2e
```

### 4. Testar a API com Mocha/Chai

#### Executar testes da API:
```bash
npm run test:api
```

#### Executar testes da API em modo watch:
```bash
npm run test:api:watch
```

#### Executar todos os testes (API + Jest + Cypress):
```bash
npm run test:all
```

### 5. Pipeline CI/CD

#### 🔄 GitHub Actions
O projeto inclui uma pipeline CI/CD completa que executa automaticamente:

- ✅ **Testes de API com Mocha Awesome**
- ✅ **Testes E2E com Cypress**
- ✅ **Geração de relatórios HTML**
- ✅ **Upload de artifacts**

#### 📊 Relatórios Mocha Awesome
```bash
# Gerar relatório local
npm run test:api

# Gerar relatório para CI
npm run test:api:ci

# Combinar e gerar relatório final
npm run test:report
```

#### 🚀 Triggers da Pipeline
- **Push** para `main` ou `develop`
- **Pull Request** para `main`
- **Alertas automáticos** para novos PRs e erros
- **Notificações** de sucesso e falha

## Documentação Swagger

Acesse a documentação interativa da API em:
`http://localhost:3001/api-docs`

## Endpoints

### Autenticação

- `POST /api/auth/login` - Realizar login
- `POST /api/auth/forgot-password` - Solicitar recuperação de senha
- `POST /api/auth/reset-password` - Redefinir senha
- `POST /api/auth/unlock-account` - Desbloquear conta
- `GET /api/auth/status` - Verificar status da conta

### Exemplos de Uso

#### Login com sucesso:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }'
```

#### Solicitar recuperação de senha:
```bash
curl -X POST http://localhost:3001/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com"
  }'
```

#### Redefinir senha:
```bash
curl -X POST http://localhost:3001/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "token": "token_recuperacao",
    "newPassword": "nova_senha123"
  }'
```

#### Verificar status da conta:
```bash
curl http://localhost:3001/api/auth/status/usuario@exemplo.com
```

## Estrutura do Projeto

```
src/
├── controllers/     # Controladores da API
├── routes/         # Rotas da aplicação
├── services/       # Lógica de negócio
├── middleware/     # Middlewares customizados
├── utils/          # Utilitários
└── server.js       # Arquivo principal do servidor
```

## Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Swagger** - Documentação da API
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Segurança
- **Morgan** - Logging de requisições
- **bcryptjs** - Criptografia de senhas
- **jsonwebtoken** - Tokens JWT

### Frontend
- **HTML5** - Estrutura da página
- **CSS3** - Estilização customizada
- **JavaScript** - Interatividade
- **MaterializeCSS** - Framework de UI
- **Font Awesome** - Ícones

## Testes

### Testes da API (Mocha/Chai):
```bash
npm run test:api
```

### Testes Unitários (Jest):
```bash
npm test
```

### Testes E2E (Cypress):
```bash
npm run test:e2e
```

### Todos os Testes:
```bash
npm run test:all
```

### 📊 Relatórios de Teste

#### Mocha Awesome Reports
Os testes de API geram relatórios HTML detalhados com:

- 📈 **Gráficos de sucesso/falha**
- ⏱️ **Tempo de execução**
- 📝 **Logs detalhados**
- 🎨 **Interface visual moderna**
- 📱 **Design responsivo**

#### Localizar Relatórios:
```bash
# Após executar os testes
open mochawesome-report/api-test-report.html
```

#### Relatórios no CI/CD:
- **GitHub Actions**: Relatórios disponíveis como artifacts
- **Múltiplas versões**: Testes em Node.js 16.x, 18.x, 20.x
- **Screenshots**: Capturas de tela em caso de falha
- **Vídeos**: Gravações dos testes E2E

## Observações

- Esta API é destinada para estudo
- Os dados são armazenados em memória (não há persistência)
- A comunicação é feita via JSON
- Senhas são criptografadas com bcrypt
- Controle de tentativas de login implementado
- Seguindo boas práticas de desenvolvimento 

 
