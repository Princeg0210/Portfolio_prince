/* ═══════════════════════════════════════
   PRINCE GUPTA — PORTFOLIO JS
═══════════════════════════════════════ */

/* ── Loader ── */
(function () {
  document.body.classList.add('loading');
  const progress = document.getElementById('loaderProgress');
  let p = 0;
  const timer = setInterval(() => {
    p += Math.random() * 18;
    if (p >= 100) { p = 100; clearInterval(timer); }
    progress.style.width = p + '%';
  }, 120);

  window.addEventListener('load', () => {
    clearInterval(timer);
    progress.style.width = '100%';
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
      document.body.classList.remove('loading');
      initReveal();
    }, 600);
  });
})();

/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
}, { passive: true });

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-card, .project-card, .social-link, .chip').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); follower.classList.add('hovered'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); follower.classList.remove('hovered'); });
});

/* ── Typed Text ── */
const words = ['Intelligent', 'Beautiful', 'Scalable', 'Meaningful'];
const typedEl = document.getElementById('typedText');
let wordIdx = 0, charIdx = 0, deleting = false;

function type() {
  const word = words[wordIdx];
  if (!deleting && charIdx <= word.length) {
    typedEl.textContent = word.slice(0, charIdx++);
    setTimeout(type, 80);
  } else if (deleting && charIdx >= 0) {
    typedEl.textContent = word.slice(0, charIdx--);
    setTimeout(type, 45);
  } else if (!deleting) {
    deleting = true; setTimeout(type, 1600);
  } else {
    deleting = false; wordIdx = (wordIdx + 1) % words.length; setTimeout(type, 400);
  }
}
type();

/* ── Scroll Reveal ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('loader')) initReveal();
});

/* ── Nav scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

/* ── Magnetic Buttons ── */
document.querySelectorAll('.magnetic, .magnetic-sm').forEach(el => {
  const strength = el.classList.contains('magnetic-sm') ? 0.25 : 0.45;
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * strength;
    const dy = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
    setTimeout(() => { el.style.transition = ''; }, 500);
  });
});

/* ── Parallax Orbs ── */
document.addEventListener('mousemove', (e) => {
  const nx = e.clientX / window.innerWidth - 0.5;
  const ny = e.clientY / window.innerHeight - 0.5;
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  if (orb1) orb1.style.transform = `translate(${nx * 30}px, ${ny * 30}px)`;
  if (orb2) orb2.style.transform = `translate(${-nx * 20}px, ${-ny * 20}px)`;
}, { passive: true });

/* ── Contact Form → opens Mail app ── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailto = `mailto:Gprincegupta0210@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    contactForm.reset();
    formSuccess.textContent = '✅ Opening your mail app — just hit Send!';
    formSuccess.style.color = '#22c55e';
    formSuccess.classList.add('visible');
    setTimeout(() => formSuccess.classList.remove('visible'), 5000);
  });
}


/* ── Skill card 3D tilt ── */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    card.style.transform = `translateY(-6px) scale(1.03) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.5s cubic-bezier(0.23,1,0.32,1)';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

/* ── Project card tilt ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    card.style.transform = `translateY(-4px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ── Active nav highlight ── */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id'); });
  navLinkEls.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) link.style.color = 'var(--accent-3)';
  });
}, { passive: true });

/* ── GitHub Live Stats ── */
async function loadGitHubStats() {
  const username = 'Princeg0210';
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
    ]);

    if (!userRes.ok || !reposRes.ok) throw new Error('API error');

    const user = await userRes.json();
    const repos = await reposRes.json();

    // Update profile stats
    const el = (id) => document.getElementById(id);
    if (el('ghRepos')) el('ghRepos').textContent = user.public_repos ?? '—';
    if (el('ghFollowers')) el('ghFollowers').textContent = user.followers ?? '—';
    if (el('ghFollowing')) el('ghFollowing').textContent = user.following ?? '—';
    if (el('ghBio') && user.bio) el('ghBio').textContent = user.bio;

    // Render repo cards
    const grid = el('ghReposGrid');
    if (!grid) return;

    const langColors = {
      Python: '#3572A5', JavaScript: '#f1e05a', HTML: '#e34c26',
      CSS: '#563d7c', 'C++': '#f34b7d', C: '#555555', default: '#a78bfa'
    };

    const filtered = repos.filter(r => !r.fork).slice(0, 6);
    grid.innerHTML = filtered.map(repo => `
      <a href="${repo.html_url}" target="_blank" rel="noopener" class="gh-repo-card reveal-up">
        <div class="gh-repo-name">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 10h18M3 14h12M3 18h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          ${repo.name}
        </div>
        <p class="gh-repo-desc">${repo.description || 'No description provided.'}</p>
        <div class="gh-repo-meta">
          ${repo.language ? `<span class="gh-repo-lang"><span class="lang-dot" style="background:${langColors[repo.language] || langColors.default}"></span>${repo.language}</span>` : ''}
          <span class="gh-repo-stars">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ${repo.stargazers_count}
          </span>
        </div>
      </a>
    `).join('');

    // Re-run reveal on new cards
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.gh-repo-card').forEach(el => io.observe(el));

  } catch {
    // Fallback — show static card pointing to profile
    const grid = document.getElementById('ghReposGrid');
    if (grid) grid.innerHTML = `
      <div class="gh-repo-card" style="grid-column:1/-1;text-align:center;padding:2rem;">
        <p style="color:var(--text-muted);margin-bottom:1rem;">Could not load live repos (API limit). View them directly on GitHub.</p>
        <a href="https://github.com/Princeg0210" target="_blank" rel="noopener" class="btn btn-ghost" style="display:inline-flex;">View GitHub Profile →</a>
      </div>`;
  }
}

// Load when GitHub section comes into view (avoid burning rate limit on load)
const ghSection = document.getElementById('github');
if (ghSection) {
  const ghObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { loadGitHubStats(); ghObserver.disconnect(); }
  }, { threshold: 0.2 });
  ghObserver.observe(ghSection);
}
