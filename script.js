/* =========================================
   SCRIPT — PORTFOLIO AHMED BEN ALI
   ========================================= */

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// === MOBILE NAV TOGGLE ===
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// === REVEAL ON SCROLL (Intersection Observer) ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when visible
      entry.target.querySelectorAll('.skill-fill[data-width]').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      });
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Trigger skill bars if already visible on load
document.querySelectorAll('.skill-fill[data-width]').forEach(bar => {
  if (bar.closest('.reveal.visible')) {
    bar.style.width = bar.dataset.width + '%';
  }
});

// === BLUEPRINT CANVAS (Hero background) ===
(function () {
  const canvas = document.getElementById('blueprintCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Lines to draw (mechanical blueprint style)
  const elements = [];

  function initElements() {
    elements.length = 0;
    const W = canvas.width;
    const H = canvas.height;

    // Grid lines
    const gridStep = 60;
    for (let x = 0; x < W; x += gridStep) {
      elements.push({ type: 'line', x1: x, y1: 0, x2: x, y2: H, progress: 0, speed: 0.003 + Math.random() * 0.004, delay: Math.random() * 0.5 });
    }
    for (let y = 0; y < H; y += gridStep) {
      elements.push({ type: 'line', x1: 0, y1: y, x2: W, y2: y, progress: 0, speed: 0.003 + Math.random() * 0.004, delay: Math.random() * 0.5 });
    }

    // Circles (cross-section indicators)
    const circles = [
      { cx: W * 0.15, cy: H * 0.3,  r: 50 },
      { cx: W * 0.8,  cy: H * 0.6,  r: 80 },
      { cx: W * 0.5,  cy: H * 0.8,  r: 35 },
      { cx: W * 0.65, cy: H * 0.2,  r: 60 },
    ];
    circles.forEach(c => elements.push({ type: 'circle', ...c, progress: 0, speed: 0.004, delay: Math.random() * 0.6 }));

    // Dimension lines
    const dims = [
      { x1: W * 0.1,  y1: H * 0.1,  x2: W * 0.4,  y2: H * 0.1  },
      { x1: W * 0.6,  y1: H * 0.5,  x2: W * 0.9,  y2: H * 0.5  },
      { x1: W * 0.2,  y1: H * 0.7,  x2: W * 0.5,  y2: H * 0.7  },
    ];
    dims.forEach(d => elements.push({ type: 'dimline', ...d, progress: 0, speed: 0.006, delay: Math.random() * 0.4 }));
  }

  let time = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 0.008;

    elements.forEach(el => {
      if (time < el.delay) return;
      el.progress = Math.min(1, el.progress + el.speed);

      ctx.strokeStyle = 'rgba(77,142,255,0.9)';
      ctx.lineWidth = 0.6;

      if (el.type === 'line') {
        const dx = el.x2 - el.x1;
        const dy = el.y2 - el.y1;
        ctx.beginPath();
        ctx.moveTo(el.x1, el.y1);
        ctx.lineTo(el.x1 + dx * el.progress, el.y1 + dy * el.progress);
        ctx.stroke();
      }

      if (el.type === 'circle') {
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = 'rgba(45,107,228,0.9)';
        ctx.beginPath();
        ctx.arc(el.cx, el.cy, el.r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * el.progress);
        ctx.stroke();
        // Crosshairs
        if (el.progress > 0.9) {
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(el.cx - el.r - 12, el.cy);
          ctx.lineTo(el.cx + el.r + 12, el.cy);
          ctx.moveTo(el.cx, el.cy - el.r - 12);
          ctx.lineTo(el.cx, el.cy + el.r + 12);
          ctx.stroke();
        }
      }

      if (el.type === 'dimline') {
        const dx = el.x2 - el.x1;
        const dy = el.y2 - el.y1;
        ctx.lineWidth = 0.7;
        ctx.strokeStyle = 'rgba(77,142,255,0.7)';
        ctx.beginPath();
        ctx.moveTo(el.x1, el.y1);
        ctx.lineTo(el.x1 + dx * el.progress, el.y1 + dy * el.progress);
        ctx.stroke();
        // End ticks
        if (el.progress > 0.05) {
          ctx.beginPath();
          ctx.moveTo(el.x1, el.y1 - 6);
          ctx.lineTo(el.x1, el.y1 + 6);
          ctx.stroke();
        }
        if (el.progress > 0.95) {
          ctx.beginPath();
          ctx.moveTo(el.x2, el.y2 - 6);
          ctx.lineTo(el.x2, el.y2 + 6);
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  initElements();
  window.addEventListener('resize', initElements);
  draw();
})();

// === CONTACT FORM ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Message envoyé ✓';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Envoyer le message';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3500);
  });
}

// === CERTIFICATS — FILTRES ===
const certFilters = document.querySelectorAll('.cert-filter');
const certCards   = document.querySelectorAll('.cert-card');

certFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    certFilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    certCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
      // Re-trigger reveal animation
      if (match) {
        card.classList.remove('visible');
        requestAnimationFrame(() => {
          setTimeout(() => card.classList.add('visible'), 50);
        });
      }
    });
  });
});
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
