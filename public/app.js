document.addEventListener('DOMContentLoaded', () => {
    // 1. Load User Data
    const userData = JSON.parse(localStorage.getItem('gymbrothers_user_data') || '{}');
    const userName = userData.userName || 'Atleta';

    // Update Welcome text and Avatar
    const welcomeEl = document.getElementById('welcome-user');
    if (welcomeEl) welcomeEl.textContent = `Olá, ${userName}!`;

    const avatarEl = document.getElementById('user-avatar');
    if (avatarEl) {
        avatarEl.textContent = userName.charAt(0).toUpperCase();
    }

    // 2. Mark Active Menu Item
    const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
            item.setAttribute('aria-current', 'page');
        } else {
            item.classList.remove('active');
            item.removeAttribute('aria-current');
        }
    });

    // 3. Logout Logic
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Deseja realmente sair?')) {
                localStorage.clear();
                window.location.href = 'login.html';
            }
        });
    }
});
