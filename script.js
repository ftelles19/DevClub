/* ============================================
   DEVCLUB — INTERACTIONS
   Vanilla JS, sem dependências externas.
   ============================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------------------------
   1. NAV — troca de estilo ao rolar
   -------------------------------------------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

/* --------------------------------------------
   2. COMMIT GRID — o elemento de assinatura.
   Gera um grid de "commits" (como o de contribuições
   do GitHub) que acende em ondas aleatórias no hero,
   e se reorganiza numa linha ascendente na seção final —
   metáfora visual de "constância gera resultado".
   -------------------------------------------- */
function buildGrid(el, cols, rows) {
  el.style.setProperty('--cols', cols);
  el.innerHTML = '';
  const cells = [];
  for (let i = 0; i < cols * rows; i++) {
    const cell = document.createElement('div');
    cell.className = 'commit-cell';
    el.appendChild(cell);
    cells.push(cell);
  }
  return cells;
}

function animateAmbientGrid(cells) {
  if (prefersReducedMotion) return;
  setInterval(() => {
    // apaga uma célula aleatória e acende outra, criando "atividade" contínua
    const off = cells[Math.floor(Math.random() * cells.length)];
    off.className = 'commit-cell';

    const on = cells[Math.floor(Math.random() * cells.length)];
    const tier = Math.random();
    on.className = 'commit-cell ' + (
      tier > 0.85 ? 'lit-4' : tier > 0.65 ? 'lit-3' : tier > 0.35 ? 'lit-2' : 'lit-1'
    );
  }, 220);
}

function drawTrendLine(cells, cols, rows) {
  // acende as células que formam uma linha ascendente da esquerda pra direita,
  // representando a curva de evolução do aluno.
  if (prefersReducedMotion) {
    cells.forEach(c => c.className = 'commit-cell lit-2');
    return;
  }
  const points = [];
  for (let x = 0; x < cols; x++) {
    const progress = x / (cols - 1);
    const y = Math.round((rows - 1) * (1 - progress) - Math.sin(progress * 3) * 0.6);
    const clampedY = Math.min(rows - 1, Math.max(0, y));
    points.push({ x, y: clampedY });
  }
  points.forEach((p, idx) => {
    setTimeout(() => {
      for (let dy = -1; dy <= 1; dy++) {
        const yy = p.y + dy;
        if (yy < 0 || yy >= rows) continue;
        const index = yy * cols + p.x;
        const cell = cells[index];
        if (!cell) continue;
        cell.className = 'commit-cell ' + (dy === 0 ? 'lit-4' : 'lit-3');
      }
    }, idx * 45);
  });
}

const heroGridEl = document.getElementById('commitGrid');
const HERO_COLS = window.innerWidth < 760 ? 12 : 24;
const HERO_ROWS = window.innerWidth < 760 ? 10 : 12;
const heroCells = buildGrid(heroGridEl, HERO_COLS, HERO_ROWS);
animateAmbientGrid(heroCells);

const finalGridEl = document.getElementById('commitGridFinal');
const FINAL_COLS = window.innerWidth < 760 ? 14 : 28;
const FINAL_ROWS = window.innerWidth < 760 ? 8 : 10;
const finalCells = buildGrid(finalGridEl, FINAL_COLS, FINAL_ROWS);

const finalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      drawTrendLine(finalCells, FINAL_COLS, FINAL_ROWS);
      finalObserver.disconnect();
    }
  });
}, { threshold: 0.4 });
finalObserver.observe(document.getElementById('cta'));

/* --------------------------------------------
   2.1 SPOTLIGHT — a "lanterna" que segue o mouse no hero,
   iluminando o grid de commits por baixo dela.
   -------------------------------------------- */
const heroEl = document.querySelector('.hero');
const spotlightEl = document.getElementById('heroSpotlight');

if (heroEl && spotlightEl && !prefersReducedMotion) {
  heroEl.addEventListener('mousemove', (event) => {
    const rect = heroEl.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    spotlightEl.style.setProperty('--mx', x + '%');
    spotlightEl.style.setProperty('--my', y + '%');
  });
}

/* --------------------------------------------
   3. TYPED TEXT — cicla profissões anteriores dos alunos
   -------------------------------------------- */
const typedTarget = document.getElementById('typedText');
const roles = ['motorista de app', 'estudante de Direito', 'vendedor', 'garçom', 'você'];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (prefersReducedMotion) {
    typedTarget.textContent = 'você';
    return;
  }
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typedTarget.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedTarget.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 65);
}
typeLoop();

/* --------------------------------------------
   4. REVEAL ON SCROLL — fade + slide genérico
   -------------------------------------------- */
document.querySelectorAll(
  '.stats-grid, .tracks-grid, .testimonials-grid, .logos-grid, .tutors-grid, .lead, .section-title'
).forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* --------------------------------------------
   5. CONTADORES — anima os números das estatísticas
   -------------------------------------------- */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const decimals = parseInt(el.dataset.decimal || '0', 10);
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = target * eased;
    el.textContent = value.toFixed(decimals).replace('.', decimals ? ',' : '') + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toFixed(decimals).replace('.', decimals ? ',' : '') + suffix;
  }
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
statsObserver.observe(document.getElementById('statsGrid'));