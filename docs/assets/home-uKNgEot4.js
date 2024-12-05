import { o as p, i as m, c as f } from './conditionallyDisplay-CIo1aDtC.js';
import { c as u, e as h, d as x } from './displayCredits-okHnSR3t.js';
import { r as d } from './render-BATGCRw1.js';
import './headers-BDo9lCsV.js';
function b() {
  const t = document.getElementById('logoutBtn');
  t && t.addEventListener('click', p);
}
function L(t, s, o, i) {
  const n = document.getElementById('pagination');
  if (!n) {
    console.error('Pagination container not found!');
    return;
  }
  n.innerHTML = '';
  const r = Math.ceil(s / o),
    a = 6;
  if (r === 0) {
    n.style.display = 'none';
    return;
  }
  n.style.display = 'flex';
  const c = Math.max(Math.min(t - Math.floor(a / 2), r - a + 1), 1),
    y = Math.min(c + a - 1, r);
  for (let e = c; e <= y; e++) {
    const l = document.createElement('button');
    (l.textContent = e),
      (l.className =
        e === t
          ? 'bg-yellow-400 text-black px-4 py-2 rounded'
          : 'bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600'),
      l.addEventListener('click', () => {
        i(e);
      }),
      n.appendChild(l);
  }
  if (t > 1) {
    const e = document.createElement('button');
    (e.textContent = 'Previous'),
      (e.className =
        'bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600'),
      e.addEventListener('click', () => {
        i(t - 1);
      }),
      n.insertBefore(e, n.firstChild);
  }
  if (t < r) {
    const e = document.createElement('button');
    (e.textContent = 'Next'),
      (e.className =
        'bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600'),
      e.addEventListener('click', () => {
        i(t + 1);
      }),
      n.appendChild(e);
  }
}
function v() {
  const t = document.getElementById('credits-section'),
    s = document.querySelector('.search-field'),
    i = document.querySelector('aside').querySelector('ul');
  m()
    ? ((t.style.display = 'block'), t.parentNode.insertBefore(s, t.nextSibling))
    : ((t.style.display = 'none'), i.parentNode.insertBefore(s, i.nextSibling));
  const n = s.querySelector('input');
  if (!n) {
    console.error('Search input not found inside searchField.');
    return;
  }
  n.addEventListener('input', async (r) => {
    const a = r.target.value.trim();
    if (a === '') {
      const { listings: c } = await u();
      d(c);
    } else {
      const c = await h(a);
      d(c);
    }
  });
}
x();
f();
b();
v();
let E = 1;
async function g(t = 1) {
  try {
    const { listings: o, totalCount: i } = await u(20, t);
    o && Array.isArray(o)
      ? (d(o), L(t, i, 20, g))
      : console.error('No listings data available');
  } catch (o) {
    console.error('Error loading listings:', o);
  }
}
g(E);
