# 📋 Cenários de Teste - Loja da Leda LTDA

Este documento descreve os cenários de teste automatizados para o sistema de autenticação da Loja da Leda LTDA.

## 🎯 Credenciais de Teste

### ✅ Usuário Válido
- **Email:** `usuario@valido.com`
- **Senha:** `senha123`
- **Nome:** "Usuário Válido"
- **Status:** Conta ativa e funcional

### ❌ Usuário Inválido
- **Email:** `usuario@invalido.com`
- **Senha:** `senha_errada` (não `senha123`)
- **Nome:** "Usuário Inválido"
- **Status:** Conta existe mas senha está incorreta

## 🔄 Fluxo de Teste Completo

### 1. **Login Válido**
```
Entrada: usuario@valido.com / senha123
Processo: Preencher campos → Clicar "Entrar"
Resultado: Redirecionamento para /welcome.html
Validações:
✅ URL contém "welcome.html"
✅ Exibe "Bem-vindo à Loja da Leda LTDA!"
✅ Mostra nome "Usuário Válido"
✅ Exibe email "usuario@valido.com"
```

### 2. **Login Inválido**
```
Entrada: usuario@invalido.com / senha123
Processo: Preencher campos → Clicar "Entrar"
Resultado: Erro de autenticação
Validações:
❌ Notificação: "Email ou senha inválidos"
❌ Permanece na página de login
```

### 3. **Login com Usuário Inexistente**
```
Entrada: usuario@inexistente.com / senha123
Processo: Preencher campos → Clicar "Entrar"
Resultado: Erro de autenticação
Validações:
❌ Notificação: "Email ou senha inválidos"
❌ Permanece na página de login
```

### 4. **Registro de Nova Conta**
```
Entrada: Dados únicos (nome, email, senha)
Processo: Abrir modal → Preencher → Clicar "Criar Conta"
Resultado: Conta criada com sucesso
Validações:
✅ Notificação: "Conta criada com sucesso!"
✅ Modal fecha automaticamente
✅ Email preenchido no formulário de login
```

### 5. **Recuperação de Senha**
```
Entrada: usuario@valido.com
Processo: Abrir modal → Preencher email → Clicar "Enviar Email"
Resultado: Email de recuperação enviado
Validações:
✅ Notificação: "Email de recuperação enviado com sucesso!"
✅ Modal fecha automaticamente
```

### 6. **Logout Completo**
```
Entrada: Usuário logado na página de boas-vindas
Processo: Clicar "Sair" → Confirmar no modal
Resultado: Logout e redirecionamento
Validações:
✅ Modal de confirmação aparece
✅ Texto: "Tem certeza que deseja sair do sistema?"
✅ Botões: "Cancelar" e "Sim, Sair"
✅ Após confirmação: Redireciona para login
✅ localStorage limpo
```

### 7. **Cancelamento de Logout**
```
Entrada: Usuário logado na página de boas-vindas
Processo: Clicar "Sair" → Clicar "Cancelar"
Resultado: Modal fecha, permanece logado
Validações:
✅ Modal de confirmação aparece
✅ Ao cancelar: Modal fecha
✅ Permanece na página de boas-vindas
✅ Usuário continua logado
```

## 🧪 Testes de Validação

### **Campos Obrigatórios**
- Tentar login sem preencher campos
- Tentar registro sem preencher campos
- Tentar recuperação sem email

### **Validação de Email**
- Formato inválido: `email-invalido`
- Formato válido: `usuario@exemplo.com`

### **Validação de Senha**
- Mínimo 3 caracteres
- Senha muito curta: `12`

## 🔧 Testes de API Direta

### **Endpoints Testados**
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `POST /api/auth/forgot-password` - Recuperação

### **Códigos de Status**
- `200` - Sucesso (login, recuperação)
- `201` - Criado (registro)
- `400` - Erro de validação
- `401` - Não autorizado
- `404` - Não encontrado

## 🚀 Como Executar os Testes

### **Executar Todos os Testes**
```bash
npx cypress run
```

### **Executar Testes Específicos**
```bash
# Apenas testes de login
npx cypress run --spec "cypress/e2e/login.cy.js"

# Apenas testes de API
npx cypress run --spec "cypress/e2e/api-validation.cy.js"
```

### **Modo Interativo**
```bash
npx cypress open
```

## 📁 Estrutura dos Arquivos de Teste

```
cypress/e2e/
├── login.cy.js           # Testes de login e logout
├── register.cy.js        # Testes de registro
├── forgot-password.cy.js # Testes de recuperação
├── api-validation.cy.js  # Testes diretos da API
└── cenarios.md          # Esta documentação
```

## ⚠️ Pré-requisitos

1. **Servidor rodando:** `npm run dev`
2. **Porta 3001:** Disponível
3. **API funcional:** Endpoints respondendo
4. **Cypress instalado:** `npm install cypress`

## 🎯 Pontos de Atenção

- **Timeout:** 10 segundos para notificações
- **Force:** Usado em alguns campos para garantir interação
- **LocalStorage:** Limpo entre testes
- **Modais:** Fechados automaticamente após ações
- **Redirecionamentos:** Validados por URL

## 📊 Métricas de Cobertura

- **Login:** 100% (válido, inválido, inexistente)
- **Registro:** 100% (sucesso, validação, duplicado)
- **Recuperação:** 100% (sucesso, inexistente)
- **Logout:** 100% (confirmação, cancelamento)
- **API:** 100% (todos os endpoints)

---

*Documentação criada para facilitar a manutenção e execução dos testes automatizados.* 