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

    if (pageId === 'home' || pageId === 'unit1' || pageId === 'unit2') {
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

['unit1', 'unit2'].forEach(function (pageId) {
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
  if (hash === 'unit1' || hash === 'unit2' || hash === 'home') {
    showPage(hash);
  }
}

window.addEventListener('hashchange', syncFromHash);
document.addEventListener('DOMContentLoaded', syncFromHash);
