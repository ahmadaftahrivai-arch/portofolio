/* =========================================================
   EDIT DATA DI SINI — konten Portfolio, Certificates,
   Awards & Tech Stack. Cukup ubah array di bawah, tampilan
   akan otomatis mengikuti.
========================================================= */
const projectsData = [
  {
    title: 'Nama Project 1',
    desc: 'Deskripsi singkat project kamu, teknologi yang dipakai, dan masalah apa yang diselesaikan.',
    tags: ['React', 'Tailwind'],
    icon: 'layers',
    color: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
    link: '#'
  },
  {
    title: 'Nama Project 2',
    desc: 'Deskripsi singkat project kedua kamu di sini.',
    tags: ['Node.js', 'Supabase'],
    icon: 'smartphone',
    color: 'linear-gradient(135deg,#22c55e,#15803d)',
    link: '#'
  },
  {
    title: 'Nama Project 3',
    desc: 'Deskripsi singkat project ketiga kamu di sini.',
    tags: ['UI/UX', 'Figma'],
    icon: 'pen',
    color: 'linear-gradient(135deg,#f97316,#c2410c)',
    link: '#'
  }
];

const certificatesData = [
  { title: 'Nama Sertifikat 1', issuer: 'Penerbit', year: '2025', icon: 'award' },
  { title: 'Nama Sertifikat 2', issuer: 'Penerbit', year: '2025', icon: 'award' },
  { title: 'Nama Sertifikat 3', issuer: 'Penerbit', year: '2026', icon: 'award' }
];

const awardsData = [
  { title: 'Nama Penghargaan 1', event: 'Nama Acara / Lomba', year: '2025', icon: 'trophy' },
  { title: 'Nama Penghargaan 2', event: 'Nama Acara / Lomba', year: '2026', icon: 'medal' }
];

const techStackData = [
  { name: 'HTML5', abbr: 'HTML', color: '#e34f26' },
  { name: 'CSS3', abbr: 'CSS', color: '#1572b6' },
  { name: 'JavaScript', abbr: 'JS', color: '#f7df1e' },
  { name: 'Tailwind CSS', abbr: 'TW', color: '#38bdf8' },
  { name: 'React', abbr: 'React', color: '#61dafb' },
  { name: 'Node.js', abbr: 'Node', color: '#3c873a' },
  { name: 'Git', abbr: 'Git', color: '#f05032' },
  { name: 'Figma', abbr: 'Fig', color: '#a259ff' }
];

/* ========================================================= */

/* ---------------- Inline SVG icon set (no external CDN) ---------------- */
const STROKE_ICONS = {
  'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  'graduation-cap': '<path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="M6 10.5v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><line x1="22" y1="8" x2="22" y2="14"/>',
  university: '<path d="M3 9 12 2l9 7"/><polyline points="9 22 9 12 15 12 15 22"/><path d="M5 10v10a1 1 0 0 0 1 1h3"/><path d="M19 10v10a1 1 0 0 1-1 1h-3"/>',
  school: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
  trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M5 4h2v3a3 3 0 0 1-2-3z"/><path d="M17 4h2a3 3 0 0 1-2 3z"/>',
  medal: '<circle cx="12" cy="15" r="6"/><path d="M9 9.5 6 3h3l3 5 3-5h3l-3 6.5"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  headphones: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
  smartphone: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'
};

const FILL_ICONS = {
  github:
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  spotify:
    'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.32-1.32 9.6-.66 13.32 1.621.42.24.6.78.42 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.72-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z'
};

function iconSVG(name) {
  if (FILL_ICONS[name]) {
    return `<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${FILL_ICONS[name]}"/></svg>`;
  }
  if (STROKE_ICONS[name]) {
    return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${STROKE_ICONS[name]}</svg>`;
  }
  return '';
}

function renderIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((el) => {
    el.innerHTML = iconSVG(el.dataset.icon);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initPreloader();
  initNav();
  renderIcons();
  initReveal();
  initCounters();
  renderPortfolio();
  initTabs();
  initContactForm();
  initGuestbook();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------------- Starfield background ---------------- */
function initStarfield() {
  const canvas = document.createElement('canvas');
  canvas.id = 'starfield-canvas';
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.zIndex = '-1';
  document.getElementById('starfield').appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let w, h, stars, shootingStars = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.floor((w * h) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.3 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005
    }));
  }
  window.addEventListener('resize', resize);
  resize();

  function maybeSpawnShootingStar() {
    if (Math.random() < 0.006 && shootingStars.length < 2) {
      const startX = Math.random() * w * 0.6 + w * 0.2;
      shootingStars.push({ x: startX, y: -10, vx: 4, vy: 5, life: 0, maxLife: 60 });
    }
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const alpha = 0.4 + Math.sin(t * s.speed * 10 + s.phase) * 0.4;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,220,255,${Math.max(alpha, 0.15)})`;
      ctx.fill();
    }

    maybeSpawnShootingStar();
    shootingStars.forEach((sh) => {
      const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 8, sh.y - sh.vy * 8);
      grad.addColorStop(0, 'rgba(255,255,255,0.9)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sh.x, sh.y);
      ctx.lineTo(sh.x - sh.vx * 8, sh.y - sh.vy * 8);
      ctx.stroke();
      sh.x += sh.vx;
      sh.y += sh.vy;
      sh.life++;
    });
    shootingStars = shootingStars.filter((sh) => sh.life < sh.maxLife && sh.y < h + 20);

    t += 0.016;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ---------------- Preloader ---------------- */
function initPreloader() {
  const pre = document.getElementById('preloader');
  const fill = document.getElementById('loader-fill');
  const pct = document.getElementById('loader-pct');
  document.body.style.overflow = 'hidden';

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        pre.classList.add('hide');
        document.body.style.overflow = '';
      }, 350);
    }
    fill.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
  }, 220);
}

/* ---------------- Nav (scrollspy + sliding indicator) ---------------- */
function initNav() {
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const indicator = document.querySelector('.nav-indicator');
  const sections = links.map((l) => document.querySelector(l.getAttribute('href')));

  function moveIndicator(el) {
    if (!el) return;
    indicator.style.width = el.offsetWidth + 'px';
    indicator.style.left = el.offsetLeft + 'px';
  }

  function setActive(link) {
    links.forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
    moveIndicator(link);
  }

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
      setActive(link);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = sections.indexOf(entry.target);
          if (idx !== -1) setActive(links[idx]);
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );
  sections.forEach((s) => s && observer.observe(s));

  window.addEventListener('resize', () => {
    const active = document.querySelector('.nav-link.active');
    moveIndicator(active);
  });

  setTimeout(() => moveIndicator(links[0]), 500);
}

/* ---------------- Reveal on scroll ---------------- */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/* re-run reveal for elements added later (tab switches) */
function revealNow(container) {
  container.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), i * 60);
  });
}

/* ---------------- Stat counters ---------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => observer.observe(c));
}

/* ---------------- Render Portfolio content ---------------- */
function renderPortfolio() {
  const projectsEl = document.getElementById('projects-grid');
  projectsEl.innerHTML = projectsData
    .map(
      (p) => `
    <div class="card overflow-hidden reveal">
      <div class="thumb" style="background:${p.color}"><span class="ico" data-icon="${p.icon}"></span></div>
      <div class="p-5">
        <h3 class="text-lg font-semibold text-white mb-1">${p.title}</h3>
        <p class="text-sm text-slate-400 mb-3">${p.desc}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
        </div>
        <a href="${p.link}" class="btn btn-outline w-full justify-center text-sm">Details <span class="ico" data-icon="arrow-right"></span></a>
      </div>
    </div>`
    )
    .join('');

  const certsEl = document.getElementById('certificates-grid');
  certsEl.innerHTML = certificatesData
    .map(
      (c) => `
    <div class="card p-5 reveal">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center" style="background:rgba(59,130,246,.15)">
          <span class="ico text-blue-400" data-icon="${c.icon}"></span>
        </div>
        <div>
          <h3 class="text-white font-semibold text-sm">${c.title}</h3>
          <p class="text-xs text-slate-400">${c.issuer} · ${c.year}</p>
        </div>
      </div>
    </div>`
    )
    .join('');

  const awardsEl = document.getElementById('awards-grid');
  awardsEl.innerHTML = awardsData
    .map(
      (a) => `
    <div class="card p-5 reveal">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center" style="background:rgba(59,130,246,.15)">
          <span class="ico text-blue-400" data-icon="${a.icon}"></span>
        </div>
        <div>
          <h3 class="text-white font-semibold text-sm">${a.title}</h3>
          <p class="text-xs text-slate-400">${a.event} · ${a.year}</p>
        </div>
      </div>
    </div>`
    )
    .join('');

  const techEl = document.getElementById('techstack-grid');
  techEl.innerHTML = techStackData
    .map(
      (t) => `
    <div class="card p-5 flex flex-col items-center gap-2 reveal">
      <div class="tech-icon" style="background:${t.color}22;color:${t.color};border:1px solid ${t.color}55">${t.abbr}</div>
      <span class="text-xs text-slate-300 font-medium">${t.name}</span>
    </div>`
    )
    .join('');

  renderIcons(document.getElementById('portfolio'));
  initReveal();
}

/* ---------------- Portfolio tabs ---------------- */
function initTabs() {
  const buttons = Array.from(document.querySelectorAll('.tab-btn'));
  const indicator = document.querySelector('.tab-indicator');
  const panels = Array.from(document.querySelectorAll('.tab-panel'));

  function moveIndicator(el) {
    indicator.style.width = el.offsetWidth + 'px';
    indicator.style.left = el.offsetLeft + 'px';
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      moveIndicator(btn);
      const target = btn.dataset.tab;
      panels.forEach((p) => p.classList.toggle('active', p.id === `panel-${target}`));
      const activePanel = document.getElementById(`panel-${target}`);
      revealNow(activePanel);
    });
  });

  setTimeout(() => moveIndicator(buttons[0]), 400);
  window.addEventListener('resize', () => {
    const active = document.querySelector('.tab-btn.active');
    if (active) moveIndicator(active);
  });
}

/* ---------------- Contact form ---------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) return;

    /* EDIT: hubungkan ke Formspree / EmailJS / backend kamu sendiri di sini.
       Contoh Formspree: ganti action form di HTML menjadi
       https://formspree.io/f/xxxxxxx lalu hapus preventDefault di atas. */
    showToast('Pesan siap dikirim! Sambungkan form ini ke Formspree/EmailJS agar benar-benar terkirim.');
    form.reset();
  });
}

function showToast(text) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ---------------- Guestbook (localStorage) ---------------- */
const GUESTBOOK_KEY = 'portfolio_guestbook';

function initGuestbook() {
  const form = document.getElementById('guestbook-form');
  const list = document.getElementById('guestbook-list');

  function load() {
    try {
      return JSON.parse(localStorage.getItem(GUESTBOOK_KEY)) || seedGuestbook();
    } catch {
      return seedGuestbook();
    }
  }

  function seedGuestbook() {
    const seed = [
      { name: 'Pengunjung', message: 'Portfolionya keren, semangat terus! 🚀', time: Date.now() - 1000 * 60 * 60 * 5 }
    ];
    localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(seed));
    return seed;
  }

  function timeAgo(ts) {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return 'baru saja';
    if (diff < 3600) return Math.floor(diff / 60) + ' menit lalu';
    if (diff < 86400) return Math.floor(diff / 3600) + ' jam lalu';
    return Math.floor(diff / 86400) + ' hari lalu';
  }

  function render() {
    const data = load().sort((a, b) => b.time - a.time);
    list.innerHTML = data
      .map(
        (c) => `
      <div class="comment-item">
        <div class="comment-avatar">${c.name.charAt(0).toUpperCase()}</div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-white">${escapeHtml(c.name)}</span>
            <span class="text-xs text-slate-500">${timeAgo(c.time)}</span>
          </div>
          <p class="text-sm text-slate-400 mt-1">${escapeHtml(c.message)}</p>
        </div>
      </div>`
      )
      .join('');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.gbname.value.trim();
    const message = form.gbmessage.value.trim();
    if (!name || !message) return;
    const data = load();
    data.push({ name, message, time: Date.now() });
    localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(data));
    form.reset();
    render();
    showToast('Komentar berhasil dikirim!');
  });

  render();
}
