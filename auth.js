// auth.js — proteção de rotas e navbar compartilhada

function checkAuth() {
  if (localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
  }
}

function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

function renderNavbar(activePage) {
  const user = localStorage.getItem('currentUser') || 'adm';
  const links = [
    { href: 'index.html', label: 'Início' },
    { href: 'produtos.html', label: 'Produtos' },
    { href: 'sobre.html', label: 'Sobre' },
    { href: 'contato.html', label: 'Contato' },
    { href: 'carrinho.html', label: '🛒 Carrinho' },
  ];

  const navLinks = links.map(l =>
    `<a href="${l.href}" class="${activePage === l.href ? 'active' : ''}">${l.label}</a>`
  ).join('');

  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) document.documentElement.setAttribute('data-theme', 'dark');

  document.body.insertAdjacentHTML('afterbegin', `
    <header class="navbar">
      <a href="index.html" class="brand">🐹 HamsterHouse</a>
      <nav>${navLinks}</nav>
      <div class="navbar-right">
        <button class="btn-dark" id="darkToggle" title="Alternar tema">${isDark ? '☀️' : '🌙'}</button>
        <span style="font-size:.85rem;color:var(--muted)">Olá, ${user}</span>
        <button class="btn-logout" onclick="logout()">Sair</button>
      </div>
      <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>
    </header>
    <nav class="mobile-nav" id="mobileNav">
      ${links.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
      <a href="#" onclick="logout()">Sair</a>
    </nav>
  `);

  document.getElementById('darkToggle').addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', dark ? '' : 'dark');
    localStorage.setItem('darkMode', dark ? 'false' : 'true');
    document.getElementById('darkToggle').textContent = dark ? '🌙' : '☀️';
  });

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileNav').classList.toggle('open');
  });
}
