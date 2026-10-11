function showPage(id) {
  document.querySelectorAll('.page').forEach(function (page) {
    page.classList.remove('active');
  });

  var target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }

  document.querySelectorAll('.topbar .navlink').forEach(function (button) {
    button.classList.remove('on');
  });

  var btn = document.getElementById('nav-' + id);
  if (btn) {
    btn.classList.add('on');
  }

  window.scrollTo(0, 0);
  updateProgress();
}

function updateProgress() {
  var bar = document.getElementById('progressBar');
  if (!bar) return;

  var height = document.documentElement.scrollHeight - window.innerHeight;
  var percent = height > 0 ? (window.scrollY / height) * 100 : 0;
  bar.style.width = percent + '%';
}

window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', updateProgress);

document.querySelectorAll('[data-page]').forEach(function (element) {
  element.addEventListener('click', function () {
    var pageId = this.getAttribute('data-page');
    if (!pageId) return;

    if (pageId === 'home' || pageId === 'unit1' || pageId === 'unit2' || pageId === 'unit3' || pageId === 'unit4') {
      showPage(pageId);
    }
  });
});

document.querySelectorAll('.copybtn').forEach(function (button) {
  button.addEventListener('click', function () {
    var codeBlock = button.closest('.codeblock');
    if (!codeBlock) return;

    var pre = codeBlock.querySelector('pre');
    if (!pre) return;

    var text = pre.innerText;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        button.textContent = 'Copied';
        setTimeout(function () {
          button.textContent = 'Copy';
        }, 1400);
      });
    }
  });
});

['unit1', 'unit2', 'unit3', 'unit4'].forEach(function (pageId) {
  var page = document.getElementById(pageId);
  if (!page) return;

  var links = page.querySelectorAll('nav.side a[href^="#"]');
  var map = {};

  links.forEach(function (link) {
    map[link.getAttribute('href').slice(1)] = link;
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var link = map[entry.target.id];
      if (!link) return;

      if (entry.isIntersecting) {
        links.forEach(function (item) {
          item.classList.remove('current');
        });
        link.classList.add('current');
      }
    });
  }, {
    root: null,
    rootMargin: '-20% 0px -70% 0px'
  });

  page.querySelectorAll('section.topic[id]').forEach(function (section) {
    observer.observe(section);
  });
});

(function () {
  var mh = document.getElementById('mh');
  var ms = document.getElementById('ms');
  var ml = document.getElementById('ml');
  var sw = document.getElementById('mixer-swatch');
  var code = document.getElementById('mixer-code');

  if (!mh || !ms || !ml) return;

  function update() {
    var h = mh.value;
    var s = ms.value;
    var l = ml.value;

    document.getElementById('mh-val').textContent = h;
    document.getElementById('ms-val').textContent = s;
    document.getElementById('ml-val').textContent = l;

    var value = 'hsl(' + h + ',' + s + '%,' + l + '%)';
    sw.style.background = value;
    code.textContent = value;
  }

  [mh, ms, ml].forEach(function (element) {
    element.addEventListener('input', update);
  });

  update();
})();

updateProgress();

function syncFromHash() {
  var hash = location.hash.replace('#', '');
  if (hash === 'unit1' || hash === 'unit2' || hash === 'unit3' || hash === 'unit4' || hash === 'home') {
    showPage(hash);
  }
}

window.addEventListener('hashchange', syncFromHash);
document.addEventListener('DOMContentLoaded', syncFromHash);


// Unit 4 study-guide demonstrations
document.addEventListener('DOMContentLoaded', function () {
  var alertDemo = document.getElementById('u4-alert-demo');
  if (alertDemo) alertDemo.addEventListener('click', function () {
    alert('Welcome to Unit 4!');
    var proceed = confirm('Continue the example?');
    if (proceed) console.log('Continuing');
  });
  var update = document.getElementById('u4-dom-update');
  var reset = document.getElementById('u4-dom-reset');
  var message = document.getElementById('u4-dom-message');
  var original = 'This card is an HTML element. JavaScript can change its text.';
  if (update && message) update.addEventListener('click', function () {
    message.textContent = 'The DOM text was updated by JavaScript!';
    message.classList.add('demo-highlight');
  });
  if (reset && message) reset.addEventListener('click', function () {
    message.textContent = original;
    message.classList.remove('demo-highlight');
  });
  var form = document.getElementById('u4-validation-form');
  if (form) form.addEventListener('submit', function (event) {
    event.preventDefault();
    var result = document.getElementById('u4-validation-result');
    if (form.checkValidity()) {
      result.textContent = 'The entered values passed the browser validation checks.';
      result.className = 'validation-success';
    } else {
      result.textContent = 'Please check the fields and enter valid values.';
      result.className = 'validation-error';
      form.reportValidity();
    }
  });
});

// Additional Unit 4 demonstrations used in the complete study notes.
document.addEventListener('DOMContentLoaded', function () {
  var card = document.getElementById('dhtml-card');
  var toggle = document.getElementById('dhtml-toggle');
  var state = document.getElementById('dhtml-state');
  if (card && toggle) toggle.addEventListener('click', function () {
    card.classList.toggle('is-active');
    if (state) state.textContent = 'Current state: ' + (card.classList.contains('is-active') ? 'highlighted' : 'normal');
  });

  var count = 0;
  var countValue = document.getElementById('u4-count-value');
  var countAdd = document.getElementById('u4-count-add');
  var countReset = document.getElementById('u4-count-reset');
  if (countAdd && countValue) countAdd.addEventListener('click', function () { count += 1; countValue.textContent = count; });
  if (countReset && countValue) countReset.addEventListener('click', function () { count = 0; countValue.textContent = count; });

  var ajaxButton = document.getElementById('u4-ajax-demo');
  if (ajaxButton) ajaxButton.addEventListener('click', function () {
    var status = document.getElementById('u4-ajax-status');
    var output = document.getElementById('u4-ajax-output');
    if (status) status.textContent = 'Loading sample data...';
    if (output) output.textContent = 'Please wait.';
    window.setTimeout(function () {
      if (status) status.textContent = 'Sample data loaded (simulated; no server request was made).';
      if (output) output.textContent = 'Web Technologies · CSS · JavaScript';
    }, 650);
  });

  var jqButton = document.getElementById('jquery-button');
  var jqMessage = document.getElementById('jquery-message');
  if (jqButton && jqMessage) jqButton.addEventListener('click', function () {
    jqMessage.textContent = 'The text update was demonstrated using plain JavaScript; see the jQuery code example above for equivalent syntax.';
    jqMessage.classList.toggle('is-highlighted');
  });
});


// Accessible light/dark theme switch. The user's choice is remembered locally.
(function () {
  var toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  var icon = toggle.querySelector('.theme-icon');
  var label = toggle.querySelector('.theme-label');

  function applyTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    if (icon) icon.textContent = isDark ? '☀' : '☾';
    if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
  }

  var savedTheme = null;
  try { savedTheme = localStorage.getItem('wt-theme'); } catch (error) {}
  applyTheme(savedTheme === 'dark');

  toggle.addEventListener('click', function () {
    var isDark = !document.body.classList.contains('dark-mode');
    applyTheme(isDark);
    try { localStorage.setItem('wt-theme', isDark ? 'dark' : 'light'); } catch (error) {}
  });
})();

// ── Hamburger menu for mobile (≤ 640 px) ─────────────────────────────────
(function () {
  var topbar = document.querySelector('.topbar');
  if (!topbar) return;
  var navgrp = topbar.querySelector('.navgrp');
  if (!navgrp) return;

  // Inject the hamburger button
  var toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.setAttribute('type', 'button');
  toggle.setAttribute('aria-label', 'Open navigation menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'main-nav');
  toggle.textContent = '☰';
  navgrp.id = 'main-nav';
  topbar.insertBefore(toggle, navgrp);

  function openMenu() {
    navgrp.classList.add('open');
    toggle.textContent = '✕';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
  }

  function closeMenu() {
    navgrp.classList.remove('open');
    toggle.textContent = '☰';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  }

  toggle.addEventListener('click', function () {
    if (navgrp.classList.contains('open')) { closeMenu(); } else { openMenu(); }
  });

  // Close when a nav link is tapped
  navgrp.querySelectorAll('.navlink').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside the topbar
  document.addEventListener('click', function (event) {
    if (!topbar.contains(event.target)) { closeMenu(); }
  });

  // Close when resizing to desktop width
  window.addEventListener('resize', function () {
    if (window.innerWidth > 640) { closeMenu(); }
  });
})();
