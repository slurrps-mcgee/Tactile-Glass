(function () {
  var KEY = 'tg-theme';
  var root = document.documentElement;

  function isDark() {
    return root.classList.contains('theme-dark');
  }

  function syncToggles() {
    var dark = isDark();
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(dark));
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.title = dark ? 'Light mode' : 'Dark mode';
    });
  }

  function apply(dark) {
    root.classList.toggle('theme-dark', dark);
    try {
      localStorage.setItem(KEY, dark ? 'dark' : 'light');
    } catch (err) { /* ignore quota / private mode */ }
    syncToggles();
  }

  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      apply(!isDark());
    });
  });

  syncToggles();

  function closeSelects(except) {
    document.querySelectorAll('details.tg-select[open]').forEach(function (select) {
      if (select !== except) select.open = false;
    });
  }

  document.querySelectorAll('.tg-select').forEach(function (select) {
    select.setAttribute('name', 'tg-select');

    select.addEventListener('toggle', function () {
      if (select.open) closeSelects(select);
    });

    select.addEventListener('click', function (event) {
      var option = event.target.closest('.select-option');
      if (!option || !select.contains(option)) return;
      select.querySelectorAll('[aria-current]').forEach(function (node) {
        node.removeAttribute('aria-current');
      });
      option.setAttribute('aria-current', 'true');
      var summary = select.querySelector('summary');
      var text = option.textContent.trim();
      var textNode = Array.from(summary.childNodes).find(function (node) {
        return node.nodeType === Node.TEXT_NODE;
      });
      if (textNode) {
        textNode.textContent = text;
      } else {
        summary.prepend(document.createTextNode(text));
      }
      select.open = false;
      event.preventDefault();
    });
  });

  document.addEventListener('pointerdown', function (event) {
    if (event.target.closest('.tg-select')) return;
    closeSelects();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeSelects();
  });

  document.addEventListener('pointerdown', function (event) {
    var btn = event.target.closest('.tg-btn.tg-glass, .tg-btn.tg-hybrid');
    if (!btn || btn.disabled || btn.classList.contains('is-disabled')) return;
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height) * 1.15;
    var ripple = document.createElement('span');
    ripple.className = 'tg-ripple';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', function () {
      ripple.remove();
    });
  });
})();
