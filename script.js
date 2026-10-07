const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');

const updateHeader = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const closeNav = () => {
  nav.classList.remove('is-open');
  header.classList.remove('is-menu-open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
};

navToggle.addEventListener('click', () => {
  const willOpen = navToggle.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('is-open', willOpen);
  header.classList.toggle('is-menu-open', willOpen);
  navToggle.setAttribute('aria-expanded', String(willOpen));
  document.body.classList.toggle('nav-open', willOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNav();
});

const tabs = document.querySelectorAll('[data-filter]');
const menuItems = document.querySelectorAll('[data-category]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;
    tabs.forEach((button) => {
      const active = button === tab;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    menuItems.forEach((item) => {
      item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.category !== filter);
    });
  });
});

const dialog = document.querySelector('[data-lightbox-dialog]');
const dialogImage = document.querySelector('[data-lightbox-image]');
const closeButton = document.querySelector('[data-lightbox-close]');

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    dialogImage.src = button.dataset.lightbox;
    dialogImage.alt = button.dataset.alt;
    dialog.showModal();
  });
});

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const copyButton = document.querySelector('[data-copy-address]');
const toast = document.querySelector('[data-toast]');
let toastTimer;

copyButton.addEventListener('click', async () => {
  const address = '경기도 광주시 곤지암읍 곤지암천로 143, 1층';

  try {
    await navigator.clipboard.writeText(address);
  } catch {
    const textArea = document.createElement('textarea');
    textArea.value = address;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }

  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
