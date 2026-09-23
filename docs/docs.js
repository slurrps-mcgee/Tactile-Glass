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

  var dropdownSelector = '.tg-dropdown, .tg-select, details.form-select, details.tg-form-select';

  function closeSelects(except) {
    document.querySelectorAll('details.tg-dropdown[open], details.tg-select[open], details.form-select[open], details.tg-form-select[open]').forEach(function (select) {
      if (select !== except) select.open = false;
    });
  }

  document.querySelectorAll(dropdownSelector).forEach(function (select) {
    select.setAttribute('name', 'tg-dropdown');

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
    if (event.target.closest('.tg-dropdown, .tg-select, details.form-select, details.tg-form-select')) return;
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

  /* —— Docs sidebar: sync is-active to path + hash / scroll —— */
  (function syncDocsSidebar() {
    var nav = document.querySelector('.docs-sidebar .sidebar-nav');
    if (!nav) return;

    var links = Array.prototype.slice.call(nav.querySelectorAll('a.sidebar-link'));
    if (!links.length) return;

    function pageFile() {
      var parts = location.pathname.split('/');
      var file = parts[parts.length - 1] || '';
      if (!file || file.indexOf('.') === -1) return 'docs.html';
      return file;
    }

    function linkParts(href) {
      var a = document.createElement('a');
      a.href = href;
      var file = (a.pathname.split('/').pop() || pageFile());
      if (!file || file.indexOf('.') === -1) file = pageFile();
      return { file: file, hash: a.hash || '' };
    }

    function setActive(active) {
      links.forEach(function (link) {
        link.classList.toggle('is-active', link === active);
      });
    }

    function pickFromUrl() {
      var file = pageFile();
      var hash = location.hash || '';
      var samePage = links.filter(function (link) {
        return linkParts(link.getAttribute('href')).file === file;
      });
      if (!samePage.length) return null;

      if (hash) {
        var exact = samePage.find(function (link) {
          return linkParts(link.getAttribute('href')).hash === hash;
        });
        if (exact) return exact;
      }

      var bare = samePage.find(function (link) {
        return !linkParts(link.getAttribute('href')).hash;
      });
      return bare || samePage[0];
    }

    function pickFromScroll() {
      var file = pageFile();
      var main = document.querySelector('.docs-main');
      var probe = (main ? main.getBoundingClientRect().top : 0) + 96;
      var best = null;
      var bestTop = -Infinity;

      samePageSections(file).forEach(function (entry) {
        var top = entry.el.getBoundingClientRect().top;
        if (top <= probe && top > bestTop) {
          bestTop = top;
          best = entry.link;
        }
      });
      return best;
    }

    function samePageSections(file) {
      var out = [];
      links.forEach(function (link) {
        var parts = linkParts(link.getAttribute('href'));
        if (parts.file !== file || !parts.hash) return;
        var id = parts.hash.slice(1);
        var el = document.getElementById(id);
        if (el) out.push({ link: link, el: el });
      });
      return out;
    }

    function refresh() {
      var fromScroll = pickFromScroll();
      setActive(fromScroll || pickFromUrl());
    }

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        var parts = linkParts(link.getAttribute('href'));
        if (parts.file === pageFile()) {
          setActive(link);
        }
      });
    });

    window.addEventListener('hashchange', refresh);
    var main = document.querySelector('.docs-main');
    if (main) {
      main.addEventListener('scroll', refresh, { passive: true });
    }
    window.addEventListener('scroll', refresh, { passive: true });
    refresh();
  })();

  function replayAnim(node) {
    if (!node) return;
    var name = node.style.animationName;
    node.style.animation = 'none';
    void node.offsetWidth;
    node.style.animation = name || '';
    node.style.removeProperty('animation');
  }

  document.querySelectorAll('[data-anim-replay]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var demo = btn.parentElement && btn.parentElement.querySelector('[data-anim-demo]');
      replayAnim(demo);
    });
  });

  document.querySelectorAll('[data-anim-replay-all]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var section = btn.closest('section');
      if (!section) return;
      section.querySelectorAll('[data-anim-demo]').forEach(replayAnim);
    });
  });

  /* Bootstrap-style custom validation for .needs-validation forms */
  document.querySelectorAll('form.needs-validation').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  document.querySelectorAll('[data-indeterminate]').forEach(function (input) {
    input.indeterminate = true;
  });
})();
