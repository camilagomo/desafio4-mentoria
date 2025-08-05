// Configuração da API
const API_BASE_URL = 'http://localhost:3001/api/auth';

// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const registerForm = document.getElementById('registerForm');
const notification = document.getElementById('notification');

// Estados dos modais
let currentModal = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando...');
    
    // Verificar se o usuário já está logado
    checkExistingLogin();
    
    // Inicializar MaterializeCSS
    if (typeof M !== 'undefined') {
        M.AutoInit();
    }
    
    setupEventListeners();
    setupInputLabels();
    checkApiStatus();
    
    // Teste inicial de notificação
    setTimeout(() => {
        showNotification('Sistema carregado com sucesso!', 'info');
    }, 1000);
});

// Verificar se o usuário já está logado
function checkExistingLogin() {
    console.log('Verificando login existente...');
    
    const userData = localStorage.getItem('userData');
    const userToken = localStorage.getItem('userToken');
    
    console.log('userData:', userData);
    console.log('userToken:', userToken);
    
    if (userData && userToken) {
        try {
            const user = JSON.parse(userData);
            console.log('Usuário parseado:', user);
            
            if (user.name && user.email) {
                console.log('Usuário válido encontrado, redirecionando...');
                showNotification('Usuário já logado, redirecionando...', 'info');
                setTimeout(() => {
                    window.location.href = '/welcome.html';
                }, 1500);
            } else {
                console.log('Dados do usuário incompletos, limpando...');
                localStorage.removeItem('userData');
                localStorage.removeItem('userToken');
            }
        } catch (error) {
            console.error('Erro ao verificar dados do usuário:', error);
            // Limpar dados inválidos
            localStorage.removeItem('userData');
            localStorage.removeItem('userToken');
        }
    } else {
        console.log('Nenhum dado de login encontrado');
    }
}

// Configurar event listeners
function setupEventListeners() {
    console.log('Configurando event listeners...');
    
    // Login form
    if (loginForm) {
        console.log('Login form encontrado, adicionando listener');
        loginForm.addEventListener('submit', handleLogin);
    } else {
        console.error('Login form não encontrado!');
    }
    
    // Forgot password form
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }
    
    // Register form
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Adicionar event listeners para os links
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const registerLink = document.getElementById('registerLink');
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showForgotPassword();
        });
    }
    
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            showRegister();
        });
    }
}

// Configurar labels dos inputs
function setupInputLabels() {
    const inputs = document.querySelectorAll('.input-field input');
    
    inputs.forEach(input => {
        const label = input.nextElementSibling;
        if (label && label.tagName === 'LABEL') {
            // Adicionar classe active se o input tem valor
            if (input.value.trim() !== '') {
                label.classList.add('active');
            }
            
            // Event listeners para focus/blur
            input.addEventListener('focus', function() {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', function() {
                if (input.value.trim() === '') {
                    label.classList.remove('active');
                }
            });
            
            input.addEventListener('input', function() {
                if (input.value.trim() !== '') {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            });
        }
    });
}

// Verificar status da API
async function checkApiStatus() {
    try {
        const response = await fetch('http://localhost:3001/health');
        if (!response.ok) {
            showNotification('API não está disponível. Verifique se o servidor está rodando.', 'error');
        }
    } catch (error) {
        showNotification('Erro ao conectar com a API. Verifique se o servidor está rodando.', 'error');
    }
}

// Função de login
async function handleLogin(event) {
    console.log('Função handleLogin chamada');
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    console.log('Tentando login com:', email);
    
    if (!validateEmail(email)) {
        console.log('Email inválido');
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    if (password.length < 3) {
        console.log('Senha muito curta');
        showNotification('A senha deve ter pelo menos 3 caracteres.', 'error');
        return;
    }
    
    const submitButton = loginForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    try {
        setButtonLoading(submitButton, true);
        
        console.log('Fazendo requisição para API...');
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        console.log('Resposta da API:', data);
        
        if (response.ok) {
            console.log('Login bem-sucedido');
            showNotification('Login realizado com sucesso!', 'success');
            
            // Salvar dados do usuário no localStorage
            localStorage.setItem('userData', JSON.stringify(data.user));
            localStorage.setItem('userToken', data.token);
            
            // Redirecionar para página de boas-vindas após 1 segundo
            setTimeout(() => {
                window.location.href = '/welcome.html';
            }, 1000);
        } else {
            console.log('Login falhou:', data.message);
            showNotification(data.message || 'Email ou senha inválidos.', 'error');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        showNotification('Erro de conexão. Verifique se a API está rodando.', 'error');
    } finally {
        setButtonLoading(submitButton, false, originalText);
    }
}

// Função de recuperação de senha
async function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('recoveryEmail').value;
    
    if (!validateEmail(email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    const submitButton = forgotPasswordForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    try {
        setButtonLoading(submitButton, true);
        
        const response = await fetch(`${API_BASE_URL}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showNotification('Email de recuperação enviado com sucesso!', 'success');
            closeModal('forgotPasswordModal');
        } else {
            showNotification(data.message || 'Erro ao enviar email de recuperação.', 'error');
        }
    } catch (error) {
        showNotification('Erro de conexão. Verifique se a API está rodando.', 'error');
    } finally {
        setButtonLoading(submitButton, false, originalText);
    }
}

// Função de registro
async function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    if (name.length < 2) {
        showNotification('O nome deve ter pelo menos 2 caracteres.', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    if (password.length < 3) {
        showNotification('A senha deve ter pelo menos 3 caracteres.', 'error');
        return;
    }
    
    const submitButton = registerForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    try {
        setButtonLoading(submitButton, true);
        
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showNotification('Conta criada com sucesso! Faça login para continuar.', 'success');
            closeModal('registerModal');
            // Preencher o formulário de login
            document.getElementById('email').value = email;
        } else {
            showNotification(data.message || 'Erro ao criar conta.', 'error');
        }
    } catch (error) {
        showNotification('Erro de conexão. Verifique se a API está rodando.', 'error');
    } finally {
        setButtonLoading(submitButton, false, originalText);
    }
}

// Funções de UI
function showForgotPassword() {
    const modal = M.Modal.getInstance(document.getElementById('forgotPasswordModal')) || 
                  M.Modal.init(document.getElementById('forgotPasswordModal'));
    modal.open();
    currentModal = 'forgotPasswordModal';
}

function showRegister() {
    const modal = M.Modal.getInstance(document.getElementById('registerModal')) || 
                  M.Modal.init(document.getElementById('registerModal'));
    modal.open();
    currentModal = 'registerModal';
}

function closeModal(modalId) {
    const modal = M.Modal.getInstance(document.getElementById(modalId));
    if (modal) {
        modal.close();
    }
    currentModal = null;
    
    // Limpar formulários
    const form = document.querySelector(`#${modalId} form`);
    if (form) {
        form.reset();
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'visibility_off';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'visibility';
    }
}

function showNotification(message, type = 'info') {
    console.log('showNotification chamada:', message, type);
    
    // Buscar o elemento notification
    const notificationElement = document.getElementById('notification');
    
    if (notificationElement) {
        console.log('Elemento notification encontrado');
        
        // Limpar classes anteriores
        notificationElement.className = 'notification';
        
        // Aplicar novas classes
        notificationElement.classList.add(type, 'show');
        notificationElement.textContent = message;
        
        console.log('Classes aplicadas:', notificationElement.className);
        console.log('Texto aplicado:', notificationElement.textContent);
        
        // Forçar reflow para garantir que as mudanças sejam aplicadas
        notificationElement.offsetHeight;
        
        // Remover após 5 segundos
        setTimeout(() => {
            notificationElement.classList.remove('show');
        }, 5000);
    } else {
        console.error('Elemento notification não encontrado!');
        // Fallback para alert se notification não existir
        alert(message);
    }
}

function setButtonLoading(button, isLoading, originalText = '') {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<div class="preloader-wrapper small active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div> Carregando...';
    } else {
        button.disabled = false;
        button.innerHTML = originalText;
    }
}

// Validações
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Funções utilitárias para testes
window.authUtils = {
    login: handleLogin,
    forgotPassword: handleForgotPassword,
    register: handleRegister,
    showNotification,
    validateEmail
}; 