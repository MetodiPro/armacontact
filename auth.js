// Gestione dell'autenticazione

// Credenziali di esempio (in un'applicazione reale, questo dovrebbe essere gestito lato server)
const USERS = [
    { username: 'admin', password: 'admin123', displayName: 'Amministratore' },
    { username: 'user', password: 'user123', displayName: 'Utente' }
];

// Verifica se l'utente è già autenticato
function checkAuth() {
    const loggedUser = localStorage.getItem('loggedUser');
    
    // Se siamo nella pagina di login ma l'utente è già autenticato, reindirizza alla dashboard
    if (window.location.pathname.includes('index.html') && loggedUser) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Se siamo nella dashboard ma l'utente non è autenticato, reindirizza al login
    if (window.location.pathname.includes('dashboard.html') && !loggedUser) {
        window.location.href = 'index.html';
        return;
    }
    
    // Se siamo nella dashboard e l'utente è autenticato, visualizza il nome utente
    if (window.location.pathname.includes('dashboard.html') && loggedUser) {
        const user = JSON.parse(loggedUser);
        document.getElementById('username-display').textContent = `Benvenuto, ${user.displayName}`;
    }
}

// Gestione del form di login
function handleLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');
        
        // Verifica le credenziali
        const user = USERS.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Salva l'utente nel localStorage
            localStorage.setItem('loggedUser', JSON.stringify({
                username: user.username,
                displayName: user.displayName
            }));
            
            // Reindirizza alla dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Mostra un messaggio di errore
            errorMessage.textContent = 'Username o password non validi';
            errorMessage.classList.remove('hidden');
        }
    });
}

// Gestione del logout
function handleLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (!logoutBtn) return;
    
    logoutBtn.addEventListener('click', function() {
        // Rimuovi l'utente dal localStorage
        localStorage.removeItem('loggedUser');
        
        // Reindirizza alla pagina di login
        window.location.href = 'index.html';
    });
}

// Inizializzazione delle funzioni di autenticazione
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    handleLogin();
    handleLogout();
});
