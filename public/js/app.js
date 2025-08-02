// Configuração da API
const API_BASE_URL = 'http://localhost:3001/api/auth';

// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const registerForm = document.getElementById('registerForm');
const resetPasswordForm = document.getElementById('resetPasswordForm');
const notification = document.getElementById('notification');

// Estados dos modais
let currentModal = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar MaterializeCSS
    M.AutoInit();
    
    setupEventListeners();
    checkApiStatus();
});

// Configurar event listeners
function setupEventListeners() {
    // Login form
    loginForm.addEventListener('submit', handleLogin);
    
    // Forgot password form
    forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    
    // Register form
    registerForm.addEventListener('submit', handleRegister);
    
    // Reset password form
    resetPasswordForm.addEventListener('submit', handleResetPassword);
    
    // MaterializeCSS já gerencia o fechamento dos modais automaticamente
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
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!validateEmail(email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    if (password.length < 3) {
        showNotification('A senha deve ter pelo menos 3 caracteres.', 'error');
        return;
    }
    
    const submitButton = loginForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    try {
        setButtonLoading(submitButton, true);
        
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showNotification('Login realizado com sucesso!', 'success');
            // Aqui você pode redirecionar para uma página de dashboard
            setTimeout(() => {
                showNotification('Redirecionando para o dashboard...', 'info');
            }, 1000);
        } else {
            showNotification(data.message || 'Erro no login. Verifique suas credenciais.', 'error');
        }
    } catch (error) {
        showNotification('Erro de conexão. Verifique se a API está rodando.', 'error');
    } finally {
        setButtonLoading(submitButton, false, originalText);
    }
}

// Função de recuperação de senha
async function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    
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

// Função de reset de senha
async function handleResetPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    const token = document.getElementById('resetToken').value;
    const newPassword = document.getElementById('newPassword').value;
    
    if (!validateEmail(email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    if (token.length < 3) {
        showNotification('Token inválido.', 'error');
        return;
    }
    
    if (newPassword.length < 3) {
        showNotification('A nova senha deve ter pelo menos 3 caracteres.', 'error');
        return;
    }
    
    const submitButton = resetPasswordForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    try {
        setButtonLoading(submitButton, true);
        
        const response = await fetch(`${API_BASE_URL}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, token, newPassword })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showNotification('Senha redefinida com sucesso!', 'success');
            closeModal('resetPasswordModal');
        } else {
            showNotification(data.message || 'Erro ao redefinir senha.', 'error');
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

function showResetPassword() {
    const modal = M.Modal.getInstance(document.getElementById('resetPasswordModal')) || 
                  M.Modal.init(document.getElementById('resetPasswordModal'));
    modal.open();
    currentModal = 'resetPasswordModal';
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
    const toggleButton = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'visibility_off';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'visibility';
    }
}

function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
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
    resetPassword: handleResetPassword,
    showNotification,
    validateEmail
}; 