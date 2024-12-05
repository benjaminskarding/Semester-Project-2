const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/home-uKNgEot4.js',
      'assets/conditionallyDisplay-CIo1aDtC.js',
      'assets/displayCredits-okHnSR3t.js',
      'assets/headers-BDo9lCsV.js',
      'assets/render-BATGCRw1.js',
      'assets/login-Dmgr26b3.js',
      'assets/register-Ci2xU6yO.js',
      'assets/listing-CsuzUVcb.js',
      'assets/listingCreate-BDjlEIfD.js',
      'assets/profile-CVFVUfAP.js',
    ])
) => i.map((i) => d[i]);
(function () {
  const a = document.createElement('link').relList;
  if (a && a.supports && a.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) u(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === 'childList')
        for (const r of t.addedNodes)
          r.tagName === 'LINK' && r.rel === 'modulepreload' && u(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function c(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (t.credentials = 'include')
        : e.crossOrigin === 'anonymous'
          ? (t.credentials = 'omit')
          : (t.credentials = 'same-origin'),
      t
    );
  }
  function u(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = c(e);
    fetch(e.href, t);
  }
})();
const p = 'modulepreload',
  h = function (s) {
    return '/' + s;
  },
  d = {},
  n = function (a, c, u) {
    let e = Promise.resolve();
    if (c && c.length > 0) {
      document.getElementsByTagName('link');
      const t = document.querySelector('meta[property=csp-nonce]'),
        r = t?.nonce || t?.getAttribute('nonce');
      e = Promise.all(
        c.map((o) => {
          if (((o = h(o)), o in d)) return;
          d[o] = !0;
          const l = o.endsWith('.css'),
            _ = l ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${o}"]${_}`)) return;
          const i = document.createElement('link');
          if (
            ((i.rel = l ? 'stylesheet' : p),
            l || ((i.as = 'script'), (i.crossOrigin = '')),
            (i.href = o),
            r && i.setAttribute('nonce', r),
            document.head.appendChild(i),
            l)
          )
            return new Promise((f, m) => {
              i.addEventListener('load', f),
                i.addEventListener('error', () =>
                  m(new Error(`Unable to preload CSS for ${o}`))
                );
            });
        })
      );
    }
    return e
      .then(() => a())
      .catch((t) => {
        const r = new Event('vite:preloadError', { cancelable: !0 });
        if (((r.payload = t), window.dispatchEvent(r), !r.defaultPrevented))
          throw t;
      });
  };
async function E(s = window.location.pathname) {
  switch (s) {
    case '/':
      await n(
        () => import('./home-uKNgEot4.js'),
        __vite__mapDeps([0, 1, 2, 3, 4])
      );
      break;
    case '/auth/':
      await n(() => Promise.resolve().then(() => w), void 0);
      break;
    case '/auth/login/':
      await n(() => import('./login-Dmgr26b3.js'), __vite__mapDeps([5, 3]));
      break;
    case '/auth/register/':
      await n(() => import('./register-Ci2xU6yO.js'), __vite__mapDeps([6, 3]));
      break;
    case '/listing/':
      await n(
        () => import('./listing-CsuzUVcb.js'),
        __vite__mapDeps([7, 1, 4, 2, 3])
      );
      break;
    case '/listing/create/':
      await n(
        () => import('./listingCreate-BDjlEIfD.js'),
        __vite__mapDeps([8, 1, 3])
      );
      break;
    case '/profile/':
      await n(
        () => import('./profile-CVFVUfAP.js'),
        __vite__mapDeps([9, 1, 2, 3])
      );
      break;
    default:
      await n(() => import('./notFound-BNXFWLKC.js'), []);
  }
}
await E(window.location.pathname);
const w = Object.freeze(
  Object.defineProperty({ __proto__: null }, Symbol.toStringTag, {
    value: 'Module',
  })
);
