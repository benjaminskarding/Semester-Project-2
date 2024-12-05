import { c as m } from './conditionallyDisplay-CIo1aDtC.js';
import { u as p, f as g, a as y, d as P } from './displayCredits-okHnSR3t.js';
import './headers-BDo9lCsV.js';
function E(t) {
  if (!t) {
    console.error('No data to render profile.');
    return;
  }
  const e = document.getElementById('username'),
    r = document.getElementById('profilePicture');
  e
    ? (e.textContent = t.name || 'Unknown User')
    : console.error('#username element not found.'),
    r
      ? ((r.src = t.avatar?.url || ''),
        (r.alt = t.avatar?.alt || 'Profile Picture'))
      : console.error('#profilePicture element not found.');
}
function U(t) {
  const e = document.getElementById('updateButton'),
    r = document.getElementById('imageUrlInput');
  if (!e || !r) {
    console.error('Update button or image URL input not found.');
    return;
  }
  e.addEventListener('click', async () => {
    const n = r.value.trim();
    if (!n) {
      alert('Please enter a valid image URL.');
      return;
    }
    try {
      if (await I(t, n)) {
        alert('Profile picture updated successfully!');
        const i = document.getElementById('profilePicture');
        i && (i.src = n);
      } else alert('Failed to update profile picture.');
    } catch (o) {
      console.error('Error updating profile picture:', o),
        alert('Failed to update profile picture. Please try again.');
    }
  });
}
async function h() {
  const t = localStorage.getItem('username');
  if (!t) {
    console.error('User is not logged in.');
    return;
  }
  try {
    const e = await g(t),
      r = document.getElementById('listings-container'),
      n = document.getElementById('user-listings');
    if (!r || !n) {
      console.error('Listings container or user listings container not found!');
      return;
    }
    if (((r.innerHTML = ''), e.length === 0)) {
      (r.className = ''),
        (r.innerHTML =
          '<p class="text-gray-500 text-center">You have no active listings.</p>');
      return;
    }
    e.forEach((o) => {
      const { id: i, title: a, description: l, media: s, endsAt: c } = o,
        d = s.length > 0 ? s[0].url : '/public/images/placeholderimage2.jfif',
        u = new Date(c).toLocaleDateString(),
        f = `
        <div class="border border-gray-700 rounded p-4">
          <a href="/listing/?id=${i}" class="block">
            <img src="${d}" alt="${a}" class="w-full h-40 object-cover rounded mb-4">
          </a>
          <h3 class="font-bold text-lg mb-2">${a}</h3>
          <p class="text-sm text-gray-400 mb-2">${l || 'No description provided.'}</p>
          <p class="text-sm text-yellow-400">Ends on: ${u}</p>
        </div>
      `;
      r.insertAdjacentHTML('beforeend', f);
    });
  } catch (e) {
    console.error('Error rendering user listings:', e);
  }
}
async function I(t, e) {
  return await p(t, { avatar: { url: e } });
}
async function v() {
  const t = localStorage.getItem('username');
  if (!t) {
    console.error('No username found in localStorage.');
    return;
  }
  try {
    const e = await y(t);
    e ? E(e) : console.error('Failed to load profile data.'),
      P('totalCredits'),
      U(t);
  } catch (e) {
    console.error('Error in profileView:', e);
  }
}
m();
v();
h();
export { v as default };
