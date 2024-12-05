import { b as a, p as l, c as n, d as i } from './headers-BDo9lCsV.js';
import { i as u } from './conditionallyDisplay-CIo1aDtC.js';
async function m(r = 12, t = 1) {
  try {
    const e = `${a}?_bids=true&limit=${r}&page=${t}&nocache=${new Date().getTime()}`,
      s = await fetch(e, { method: 'GET', headers: l() });
    if (!s.ok) {
      const o = await s.text();
      throw (
        (console.error(
          `Failed to fetch listings: ${s.status} ${s.statusText}, body: ${o}`
        ),
        new Error(`Failed to fetch listings: ${s.statusText || s.status}`))
      );
    }
    const c = await s.json();
    return {
      listings: c.data.sort(
        (o, d) => new Date(d.created) - new Date(o.created)
      ),
      totalCount: c.meta.totalCount,
    };
  } catch (e) {
    return console.error('Error fetching listings:', e.message), null;
  }
}
async function $(r) {
  try {
    const t = await fetch(`${a}/${r}?_bids=true`);
    if (!t.ok) throw new Error(`Failed to fetch listing: ${t.statusText}`);
    return await t.json();
  } catch (t) {
    return console.error('Error fetching listing:', t), null;
  }
}
async function p(r) {
  const t = `${i}/${r}?_listings=true`;
  try {
    const e = await fetch(t, { method: 'GET', headers: n() });
    if (!e.ok)
      throw new Error(`Failed to fetch user listings: ${e.statusText}`);
    return (await e.json()).data.listings || [];
  } catch (e) {
    return console.error('Error fetching user listings:', e), [];
  }
}
async function y(r) {
  try {
    const t = `${a}/search?q=${encodeURIComponent(r)}`,
      e = await fetch(t, { method: 'GET', headers: l() });
    if (!e.ok)
      throw new Error(`Failed to fetch filtered listings: ${e.statusText}`);
    return (await e.json()).data || [];
  } catch (t) {
    return console.error('Error fetching filtered listings:', t), [];
  }
}
async function f(r) {
  try {
    const t = await fetch(`${i}/${r}`, { method: 'GET', headers: n() });
    if (!t.ok)
      throw (
        (console.error('API error:', t.status, t.statusText),
        new Error(`Error fetching profile: ${t.statusText}`))
      );
    const { data: e } = await t.json();
    return e;
  } catch (t) {
    return console.error('Error in readProfile:', t.message), null;
  }
}
async function E(r, t) {
  try {
    const e = await fetch(`${i}/${r}`, {
      method: 'PUT',
      headers: n(),
      body: JSON.stringify(t),
    });
    if (!e.ok) throw new Error(`Failed to update profile: ${e.statusText}`);
    return await e.json();
  } catch (e) {
    return console.error('Error updating profile:', e), null;
  }
}
async function T() {
  const r = localStorage.getItem('username');
  if (!r || !u()) {
    const t = document.querySelector('.credits-section');
    t && t.classList.add('hidden');
    return;
  }
  try {
    const t = await f(r);
    if (t) {
      const e = t.credits || 0,
        s = document.getElementById('availableCredits');
      s
        ? (s.textContent = e)
        : console.error('Available Credits Element not found!');
    } else console.error('Failed to fetch profile data.');
  } catch (t) {
    console.error('Error fetching credits:', t);
  }
}
export { f as a, $ as b, m as c, T as d, y as e, p as f, E as u };