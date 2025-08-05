const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Autenticação e Login',
      version: '1.0.0',
      description: 'API REST para autenticação e login com controle de tentativas',
      contact: {
        name: 'Desafio 3',
        email: 'contato@exemplo.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de Desenvolvimento'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rotas
app.use('/api/auth', authRoutes);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota para acessar a especificação JSON do Swagger
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API de Autenticação funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

// Rota principal - página de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rota para página de boas-vindas
app.get('/welcome', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/welcome.html'));
});

// Rota para testar notificações
app.get('/test', (req, res) => {
  console.log('📄 Servindo página de teste de notificações');
  res.sendFile(path.join(__dirname, '../test-login.html'));
});

// Rota para página de limpeza de cache
app.get('/clear-cache', (req, res) => {
    console.log('🧹 Servindo página de limpeza de cache');
    res.sendFile(path.join(__dirname, '../public/clear-cache.html'));
});

// Rota para página de limpeza de cache (versão simples)
app.get('/simple-clear', (req, res) => {
    console.log('🧹 Servindo página de limpeza de cache (versão simples)');
    res.sendFile(path.join(__dirname, '../public/simple-clear-cache.html'));
});

// Rota para página de debug
app.get('/debug', (req, res) => {
    console.log('🔧 Servindo página de debug');
    res.sendFile(path.join(__dirname, '../public/debug-cache.html'));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não existe`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health check disponível em: http://localhost:${PORT}/health`);
  console.log(`🧪 Teste de notificações em: http://localhost:${PORT}/test`);
});

module.exports = app; 