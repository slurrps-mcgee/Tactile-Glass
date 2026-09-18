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

  document.querySelectorAll('.neu-select, .glass-select, .hybrid-select').forEach(function (select) {
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
})();
