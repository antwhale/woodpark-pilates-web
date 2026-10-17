const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
let closeTimer;

const closeMenu = (returnFocus = false) => {
  if (!document.body.classList.contains('menu-open')) return;
  clearTimeout(closeTimer);
  document.body.classList.add('menu-closing');
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.querySelector('span')?.replaceChildren('Menu');
  closeTimer = window.setTimeout(() => {
    document.body.classList.remove('menu-closing');
    if (returnFocus) menuButton?.focus();
  }, 850);
};

menuButton?.addEventListener('click', () => {
  if (document.body.classList.contains('menu-open')) {
    closeMenu();
    return;
  }
  clearTimeout(closeTimer);
  document.body.classList.remove('menu-closing');
  document.body.classList.add('menu-open');
  const open = true;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span')?.replaceChildren(open ? 'Close' : 'Menu');
});

nav?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    closeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
    closeMenu(true);
  }
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  document.querySelectorAll('main > section:not(:first-child)').forEach((section) => revealObserver.observe(section));
}

const signupModal = document.querySelector('#signup-modal');
const signupFrame = document.querySelector('#signup-frame');
const signupTitle = document.querySelector('#signup-modal-title');
const signupExternal = document.querySelector('#signup-external');

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('.signup-trigger');
  if (trigger && signupModal) {
    const url = trigger.dataset.signupUrl;
    if (!url || url === '#') return;
    signupTitle.textContent = trigger.dataset.signupName || 'Join Woodpark Wellness';
    signupFrame.src = url;
    signupExternal.href = url;
    signupModal.showModal();
  }
  if (event.target.closest('.modal-close')) signupModal?.close();
});

signupModal?.addEventListener('click', (event) => {
  if (event.target === signupModal) signupModal.close();
});

signupModal?.addEventListener('close', () => {
  if (signupFrame) signupFrame.src = 'about:blank';
});
