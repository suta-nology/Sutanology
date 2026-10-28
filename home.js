const language = document.querySelector('#language');
const themeButton = document.querySelector('#themeToggle');
const menuButton = document.querySelector('#menuToggle');
const navigation = document.querySelector('#navigation');
const interestNote = document.querySelector('#contactInterest');
const emailLink = document.querySelector('#emailLink');
let currentLanguage = 'jp';
let selectedInterest = '';
let theme = 'light';

function remember(key, value) { try { localStorage.setItem(key, value); } catch {} }
function renderCopy(text) {
  // Allow only the two formatting tags used by the local translation file.
  return text.replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]))
    .replace(/&lt;(br|em|\/em)&gt;/g, '<$1>');
}
function updateMenuLabel() {
  menuButton.setAttribute('aria-label', i18n[currentLanguage][menuButton.getAttribute('aria-expanded') === 'true' ? 'menuClose' : 'menuOpen']);
}
function updateInterest() {
  const titleKey = {website:'webTitle', tools:'toolsTitle', video:'videoTitle'}[selectedInterest];
  interestNote.hidden = !titleKey;
  if (titleKey) {
    const title = i18n[currentLanguage][titleKey];
    interestNote.textContent = `${i18n[currentLanguage].interestLabel}: ${title}`;
    emailLink.href = `mailto:komangsuta187@gmail.com?subject=${encodeURIComponent(`Sutanology — ${title}`)}`;
  } else emailLink.href = 'mailto:komangsuta187@gmail.com';
}
function applyLanguage(value) {
  currentLanguage = Object.hasOwn(i18n, value) ? value : 'jp';
  const copy = i18n[currentLanguage];
  document.documentElement.lang = currentLanguage === 'jp' ? 'ja' : currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    if (copy[element.dataset.i18n] !== undefined) element.innerHTML = renderCopy(copy[element.dataset.i18n]);
  });
  document.querySelector('meta[name="description"]').content = copy.pageDescription;
  themeButton.setAttribute('aria-label', copy.themeLabel);
  language.value = currentLanguage;
  updateMenuLabel();
  updateInterest();
  remember('profileLang', currentLanguage);
}
// Preserve the site's Japanese-first opening behavior.
applyLanguage('jp');
language.addEventListener('change', () => applyLanguage(language.value));
try { if (localStorage.getItem('sutaJapaneseTheme') === 'dark') theme = 'dark'; } catch {}
function applyTheme() {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#111e2b' : '#ffffff';
  remember('sutaJapaneseTheme', theme);
}
applyTheme();
themeButton.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; applyTheme(); });
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  updateMenuLabel();
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  navigation.classList.toggle('is-open', isOpen);
  updateMenuLabel();
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
});
window.matchMedia('(min-width: 851px)').addEventListener('change', closeMenu);
document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => {
  selectedInterest = link.dataset.interest;
  updateInterest();
}));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = navigation.querySelector(`a[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, {rootMargin:'-20% 0px -55% 0px'});
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
document.querySelector('#year').textContent = new Date().getFullYear();
