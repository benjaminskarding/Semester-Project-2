import { a as g, c as p } from './conditionallyDisplay-CIo1aDtC.js';
import { b as f, c as y } from './headers-BDo9lCsV.js';
async function h(r) {
  try {
    const e = await fetch(f, {
      method: 'POST',
      headers: y(),
      body: JSON.stringify(r),
    });
    if (!e.ok) throw new Error(`Error creating listing: ${e.statusText}`);
    return await e.json();
  } catch (e) {
    throw (console.error('Error in createListing:', e), e);
  }
}
function I() {
  const r = document.getElementById('createListingForm');
  if (!r) {
    console.error('Create Listing form not found');
    return;
  }
  r.addEventListener('submit', async (e) => {
    e.preventDefault();
    const i = document.getElementById('title').value.trim(),
      o = document.getElementById('description').value.trim(),
      n = parseInt(document.getElementById('duration').value, 10),
      a = document
        .getElementById('mediaUrls')
        .value.split(',')
        .map((t) => t.trim())
        .filter((t) => t),
      c = document
        .getElementById('tags')
        .value.split(',')
        .map((t) => t.trim())
        .filter((t) => t);
    if (!i || !n || isNaN(n) || n <= 0) {
      alert('Please provide a valid title and duration (in hours).');
      return;
    }
    if (a.some((t) => !t.startsWith('http'))) {
      alert('Please provide valid media URLs (starting with http or https).');
      return;
    }
    const d = new Date(),
      l = new Date(d.getTime() + n * 60 * 60 * 1e3).toISOString(),
      u = {
        title: i,
        description: o,
        endsAt: l,
        media: a.map((t) => ({ url: t })),
        tags: c,
      },
      s = r.querySelector("button[type='submit']");
    s.disabled = !0;
    try {
      const t = await h(u);
      alert('Listing created successfully!'),
        (window.location.href = '/'),
        r.reset();
    } catch (t) {
      const m = t.response?.data?.message || 'An unexpected error occurred.';
      alert(`Failed to create listing: ${m}`), console.error('Error:', t);
    } finally {
      s.disabled = !1;
    }
  });
}
g();
p();
I();
