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
    icon: '🧩',
    color: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
    link: '#'
  },
  {
    title: 'Nama Project 2',
    desc: 'Deskripsi singkat project kedua kamu di sini.',
    tags: ['Node.js', 'Supabase'],
    icon: '📱',
    color: 'linear-gradient(135deg,#22c55e,#15803d)',
    link: '#'
  },
  {
    title: 'Nama Project 3',
    desc: 'Deskripsi singkat project ketiga kamu di sini.',
    tags: ['UI/UX', 'Figma'],
    icon: '🎨',
    color: 'linear-gradient(135deg,#f97316,#c2410c)',
    link: '#'
  }
];

const certificatesData = [
  { title: 'Nama Sertifikat 1', issuer: 'Penerbit', year: '2025', icon: '📜' },
  { title: 'Nama Sertifikat 2', issuer: 'Penerbit', year: '2025', icon: '📜' },
  { title: 'Nama Sertifikat 3', issuer: 'Penerbit', year: '2026', icon: '📜' }
];

const awardsData = [
  { title: 'Nama Penghargaan 1', event: 'Nama Acara / Lomba', year: '2025', icon: '🏆' },
  { title: 'Nama Penghargaan 2', event: 'Nama Acara / Lomba', year: '2026', icon: '🥇' }
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

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initPreloader();
  initNav();
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
      <div class="thumb" style="background:${p.color}"><span class="ico">${p.icon}</span></div>
      <div class="p-5">
        <h3 class="text-lg font-semibold text-white mb-1">${p.title}</h3>
        <p class="text-sm text-slate-400 mb-3">${p.desc}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
        </div>
        <a href="${p.link}" class="btn btn-outline w-full justify-center text-sm">Details <span class="ico">→</span></a>
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
          <span class="ico text-blue-400">${c.icon}</span>
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
          <span class="ico text-blue-400">${a.icon}</span>
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
