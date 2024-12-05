import { g as c, c as l, i as u } from './conditionallyDisplay-CIo1aDtC.js';
import { a as m } from './render-BATGCRw1.js';
import { d as p } from './displayCredits-okHnSR3t.js';
import { b as g, c as b } from './headers-BDo9lCsV.js';
async function y(e, t) {
  try {
    const o = `${g}/${e}/bids`,
      i = await fetch(o, {
        method: 'POST',
        headers: b(),
        body: JSON.stringify({ amount: t }),
      });
    if (!i.ok) {
      const d = (await i.json()).errors?.[0]?.message || 'Failed to place bid.';
      throw new Error(d);
    }
    return await i.json();
  } catch (o) {
    throw (console.error('Error placing bid:', o), o);
  }
}
function f(e, t, o = []) {
  const i = document.getElementById('bidSection'),
    n = document.getElementById('bidButton');
  if (!i || !n) {
    console.error('Bid section or button not found.');
    return;
  }
  let d = [...o];
  n.addEventListener('click', () => {
    if (!document.getElementById('bidInput')) {
      const r = document.createElement('input');
      (r.type = 'number'),
        (r.id = 'bidInput'),
        (r.placeholder = 'Enter your bid'),
        (r.className =
          'text-center py-2 text-black rounded border border-gray-300 w-full max-w-xs mt-2'),
        i.appendChild(r),
        (n.textContent = 'Submit Bid'),
        (n.onclick = async () => {
          const s = parseFloat(r.value.trim());
          if (isNaN(s) || s <= t) {
            alert(
              `Please enter a valid bid amount greater than the current bid of ${t}.`
            );
            return;
          }
          try {
            await y(e, s), alert('Bid placed successfully!');
            const a = c();
            a && d.push({ bidder: { name: a.username }, amount: s }),
              (n.textContent = 'Make Bid'),
              r.remove(),
              (n.onclick = null),
              setTimeout(() => {
                window.location.reload();
              }, 1e3);
          } catch (a) {
            alert(a.message || 'Failed to place bid. Please try again.'),
              console.error('Error placing bid:', a);
          }
        });
    }
  });
}
function B() {
  return new URLSearchParams(window.location.search).get('id');
}
function I() {
  p(), l(), m(), h();
  const e = B(),
    t = w();
  f(e, t);
}
function h() {
  const e = document.getElementById('bidButton'),
    t = document.getElementById('creditsBlock');
  u() ||
    (e?.style.setProperty('display', 'none'),
    t?.style.setProperty('display', 'none'));
}
function w() {
  const e = document.getElementById('currentBid');
  return parseFloat(e?.textContent?.trim()) || 0;
}
I();
