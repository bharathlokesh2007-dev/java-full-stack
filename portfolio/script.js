document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Active nav highlight on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  function onScroll() {
    const y = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      if (y >= top && y < top + sec.offsetHeight) {
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${sec.id}`));
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Animate skill bars when visible
  const skillBars = document.querySelectorAll('.bar');
  const skillsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const b = entry.target;
        const level = b.getAttribute('data-level') || '60';
        b.classList.add('filled');
        b.style.setProperty('--fill-width', level + '%');
        skillsObserver.unobserve(b);
      }
    });
  }, { threshold: 0.2 });
  skillBars.forEach(b => skillsObserver.observe(b));

  // Contact form handling (frontend only)
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formMessage.textContent = 'Sending message...';
      setTimeout(() => {
        formMessage.textContent = 'Message sent. Thank you — I will reply soon!';
        form.reset();
      }, 800);
    });
  }

  // Copy to clipboard for contact details
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(text).then(() => {
        const prev = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = prev, 1200);
      });
    });
  });

  // Scroll to top button
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    if (!toTop) return;
    toTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  toTop && toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
