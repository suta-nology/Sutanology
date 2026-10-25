const filters = [...document.querySelectorAll('[data-filter]')];
const groups = [...document.querySelectorAll('.collection-group')];
const validCategories = new Set(['all', ...groups.map(group => group.id)]);

function showCategory(category) {
  if (!validCategories.has(category)) category = 'all';
  let count = 0;
  groups.forEach(group => {
    group.hidden = category !== 'all' && group.id !== category;
    if (!group.hidden) count += group.querySelectorAll('.work-card').length;
  });
  filters.forEach(filter => {
    if (filter.dataset.filter === category) filter.setAttribute('aria-current', 'true');
    else filter.removeAttribute('aria-current');
  });
  document.querySelector('#result-count').textContent = count;
}

filters.forEach(filter => filter.addEventListener('click', event => {
  // Preserve standard opening in a new tab or window.
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  history.pushState(null, '', filter.getAttribute('href'));
  showCategory(filter.dataset.filter);
}));

function categoryFromLocation() {
  const category = location.hash.slice(1);
  if (category === 'top') return;
  showCategory(category);
}

window.addEventListener('hashchange', categoryFromLocation);
window.addEventListener('popstate', categoryFromLocation);
categoryFromLocation();
