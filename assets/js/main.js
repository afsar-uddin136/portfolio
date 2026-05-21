/* ============================================
   PORTFOLIO — main.js
   Author: Md. Afsar Uddin
   ============================================ */

/* ---- Custom Cursor ---- */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor scale on hover
document.querySelectorAll('a, button, .skill-category, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '16px';
    cursor.style.height = '16px';
    cursorFollower.style.width  = '52px';
    cursorFollower.style.height = '52px';
    cursorFollower.style.borderColor = 'rgba(0,245,160,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    cursorFollower.style.width  = '36px';
    cursorFollower.style.height = '36px';
    cursorFollower.style.borderColor = 'rgba(0,245,160,0.4)';
  });
});

/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---- Typed Text ---- */
const texts = [
  'Backend Engineer',
  'AI Enthusiast',
  'Spring Boot Dev',
  'Problem Solver',
  'CSE Student @ DIU'
];
let textIndex = 0;
let charIndex  = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeWriter() {
  const current = texts[textIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex  = (textIndex + 1) % texts.length;
    delay = 400;
  }

  setTimeout(typeWriter, delay);
}
typeWriter();

/* ---- Scroll Reveal ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      siblings.forEach((el, idx) => {
        if (el === entry.target) {
          el.style.transitionDelay = `${idx * 0.1}s`;
        }
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- Counter Animation ---- */
function animateCounter(el, target, duration = 1600) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Ease out
    const val = Math.floor(progress * (1 - Math.pow(1 - progress, 3)) * target + (1 - (1 - Math.pow(1 - progress, 3)) * progress) * 0);
    el.textContent = Math.round(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__num[data-target]').forEach(el => counterObserver.observe(el));

/* ---- Contact Form ---- */
const contactForm = document.getElementById('contactForm');
const formNote    = document.getElementById('formNote');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formNote.textContent = '⚠ Please fill in all fields.';
    formNote.style.color = '#ff6b6b';
    return;
  }

  // Loading state
  btn.disabled = true;
  btn.innerHTML = 'Sending... <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';

  try {
    const res = await fetch(contactForm.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (res.ok) {
      formNote.textContent = '✓ Message sent! I\'ll get back to you soon.';
      formNote.style.color = 'var(--accent)';
      contactForm.reset();
      btn.innerHTML = '✓ Sent!';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
        formNote.textContent = '';
      }, 4000);
    } else {
      throw new Error('Failed');
    }
  } catch {
    formNote.textContent = '✗ Something went wrong. Try emailing directly.';
    formNote.style.color = '#ff6b6b';
    btn.disabled = false;
    btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>';
  }
});

/* ---- Skill Bar Animation ---- */
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-bar-fill');
      fills.forEach((fill, i) => {
        const targetWidth = fill.dataset.width;
        setTimeout(() => {
          fill.style.width = targetWidth + '%';
        }, i * 120); // stagger each bar by 120ms
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillBarsContainer = document.querySelector('.skills__bars');
if (skillBarsContainer) skillBarObserver.observe(skillBarsContainer);

/* ---- Active nav link on scroll ---- */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--accent)'
      : '';
  });
});