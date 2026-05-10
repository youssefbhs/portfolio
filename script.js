// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (entry.target.dataset.delay || 0) + 'ms';
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.timeline-content, .skill-card, .edu-card, .about-text, .about-images, .contact-left, .contact-form, .hero-text, .hero-image, .section-header'
).forEach((el, i) => {
  el.classList.add('fade-up');
  el.dataset.delay = (i % 4) * 80;
  observer.observe(el);
});

// Language bar animation
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.lang-fill').forEach(bar => {
        const target = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => {
          setTimeout(() => { bar.style.width = target; }, 100);
        });
      });
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.lang-card').forEach(card => langObserver.observe(card));

// Contact form — Formspree: sign up at formspree.io, create a form, paste your ID below
const FORMSPREE_ID = 'YOUR_FORM_ID';

document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const note = document.getElementById('form-note');
  const btn = this.querySelector('button[type="submit"]');
  const data = {
    name: this.name.value.trim(),
    email: this.email.value.trim(),
    message: this.message.value.trim()
  };

  if (!data.name || !data.email || !data.message) {
    note.textContent = 'Please fill in all fields.';
    note.style.color = '#ff6b6b';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending…';

  try {
    const res = await fetch('https://formspree.io/f/' + FORMSPREE_ID, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      note.textContent = "Message sent! I'll get back to you soon.";
      note.style.color = 'var(--accent)';
      this.reset();
    } else {
      throw new Error();
    }
  } catch {
    note.textContent = 'Something went wrong. Email me directly at youssefbhs@gmail.com';
    note.style.color = '#ff6b6b';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message';
    setTimeout(() => { note.textContent = ''; }, 6000);
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
}, { passive: true });
