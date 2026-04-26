/* ============================================================
   MAIN.JS — Gamified Animations with Anime.js
   Hamizan Arfa
   ============================================================ */

/* ── 1. SCROLL-SPY: Highlight nav link sesuai section yang terlihat ── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) link.classList.add('active');
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* ── 2. SMOOTH SCROLL saat klik nav link ── */
function initSmoothNavScroll() {
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (!target) return;

      const navH = 60;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });

      document.getElementById('nav-links')?.classList.remove('open');
    });
  });
}

/* ── 3. HAMBURGER MENU (mobile) ── */
function initNavToggle() {
  const toggle   = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

/* ── 4. ANIME.JS: INITIAL HERO ANIMATION (Staggered Load) ── */
function initHeroAnimation() {
  anime.timeline({ easing: 'easeOutExpo' })
    .add({
      targets: '.hero-tag',
      translateY: [-30, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 200
    })
    .add({
      targets: '.hero-name',
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1000,
      elasticity: 600 // Bouncy gamified effect
    }, '-=600')
    .add({
      targets: '.hero-desc',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800
    }, '-=600')
    .add({
      targets: '.hero-cta .btn',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(150),
      duration: 800
    }, '-=600');
}

/* ── 5. ANIME.JS: SCROLL ANIMATIONS (Staggered Reveal) ── */
function initScrollAnimations() {
  // Observers for different sections to trigger anime.js
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

  // ABOUT SECTION ANIMATION
  const aboutObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: '#about .animate-hidden',
          translateY: [50, 0],
          opacity: [0, 1],
          delay: anime.stagger(200),
          easing: 'easeOutElastic(1, .8)',
          duration: 1200
        });
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const aboutSection = document.getElementById('about');
  if(aboutSection) aboutObserver.observe(aboutSection);

  // TIMELINE ANIMATION (QUEST LOG)
  const timelineObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: '.timeline-entry.animate-hidden',
          translateX: [-50, 0],
          opacity: [0, 1],
          delay: anime.stagger(250),
          easing: 'easeOutQuad',
          duration: 800
        });
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  const timelineSection = document.querySelector('.timeline');
  if(timelineSection) timelineObserver.observe(timelineSection);


  // CONTACT PANELS ANIMATION
  const contactObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: '#contact .animate-hidden',
          scale: [0.9, 1],
          opacity: [0, 1],
          delay: anime.stagger(300),
          easing: 'easeOutBack',
          duration: 1000
        });
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  const contactSection = document.getElementById('contact');
  if(contactSection) contactObserver.observe(contactSection);
}


/* ── 6. ANIME.JS: SKILL BARS ── */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const pct = el.getAttribute('data-skill') || '0';
        
        anime({
          targets: el,
          width: ['0%', pct + '%'],
          easing: 'easeOutElastic(1, .6)', // Bouncy bar gamified
          duration: 1500,
          delay: 300
        });
        
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(el => observer.observe(el));
}

/* ── 7. ANIME.JS: COUNTERS ANIMATION (Hero Stats) ── */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target')) || 0;
        
        // Objek sementara untuk anime.js mengubah nilainya
        const countObj = { val: 0 };
        
        anime({
          targets: countObj,
          val: target,
          round: 1, // Membulatkan angka agar jadi integer
          easing: 'easeInOutQuad',
          duration: 2000,
          update: function() {
            el.innerHTML = countObj.val;
          }
        });

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}


/* ── 8. PORTFOLIO FILTER WITH ANIME.JS ── */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.achievement-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      
      // Hide all first
      cards.forEach(card => card.style.display = 'none');
      
      // Find matching
      const matchingCards = Array.from(cards).filter(card => {
        return filter === 'all' || card.getAttribute('data-category') === filter;
      });
      
      matchingCards.forEach(card => card.style.display = 'flex');

      // Animate showing cards
      anime({
        targets: matchingCards,
        scale: [0.8, 1],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: 'easeOutElastic(1, .8)',
        duration: 800
      });
    });
  });
}

/* ── 9. MODAL LIGHTBOX (portfolio cards) ── */
function initPortfolioModal() {
  const cards          = document.querySelectorAll('.achievement-card');
  const overlay        = document.getElementById('modal-overlay');
  const closeBtn       = document.getElementById('modal-close');
  const modalImg       = document.getElementById('modal-img');
  const modalTitle     = document.getElementById('modal-cert-title');
  const modalDesc      = document.getElementById('modal-cert-desc');
  const modalTitleText = document.getElementById('modal-title-text');
  const modalBox       = document.querySelector('.modal-box');

  if (!overlay) return;

  function openModal(card) {
    const title = card.getAttribute('data-modal-title') || 'Certificate';
    const img   = card.getAttribute('data-modal-img') || '';
    const desc  = card.getAttribute('data-modal-desc') || '';

    modalTitleText.textContent = '[ ' + title.toUpperCase() + ' ]';
    modalImg.src   = img;
    modalImg.alt   = title;
    modalTitle.textContent = title;
    modalDesc.textContent  = desc;
    
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Anime.js modal pop-in effect
    anime({
      targets: modalBox,
      scale: [0.5, 1],
      opacity: [0, 1],
      easing: 'easeOutElastic(1, .6)',
      duration: 800
    });
  }

  function closeModal() {
    // Anime.js modal pop-out effect
    anime({
      targets: modalBox,
      scale: [1, 0.5],
      opacity: [1, 0],
      easing: 'easeInQuad',
      duration: 300,
      complete: function() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        modalImg.src = '';
      }
    });
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ── 10. CONTACT FORM ── */
function initContactForm() {
  const form       = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  if (!form) return;

  // We are keeping default form submission for Formspree as mentioned in README
  // The submit event listener below is optional visual feedback before redirect
  form.addEventListener('submit', e => {
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'SENDING...';
    btn.disabled = true;
  });
}

/* ── 11. NAVBAR: shadow saat scroll ── */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 50
      ? '0 4px 20px rgba(139,233,253,0.15)'
      : 'none';
  });
}

/* ── 12. GLITCH acak pada hero name ── */
function initRandomGlitch() {
  const el = document.querySelector('.hero-name');
  if (!el) return;
  setInterval(() => {
    el.style.animation = 'glitch 0.3s steps(2,end)';
    setTimeout(() => { el.style.animation = ''; }, 300);
  }, 4000);
}

/* ── 13. INIT SEMUA ── */
document.addEventListener('DOMContentLoaded', () => {
  // Atur initial state untuk animasi
  anime.set('.animate-hidden', { opacity: 0 });
  
  initScrollSpy();
  initSmoothNavScroll();
  initNavToggle();
  initHeroAnimation(); // Hero animation menggantikan typing effect dasar
  initScrollAnimations();
  initSkillBars();
  initCounters();
  initPortfolioFilter();
  initPortfolioModal();
  initContactForm();
  initNavbarScroll();
  initRandomGlitch();

  console.log('%c🕹️ HAMIZAN ARFA — GAMIFIED LANDING PAGE LOADED!', 'color:#8be9fd;font-family:monospace;font-size:14px;');
});
