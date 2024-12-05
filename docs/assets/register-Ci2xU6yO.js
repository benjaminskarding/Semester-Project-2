import { a as o, p as s } from './headers-BDo9lCsV.js';
async function i(t) {
  try {
    const e = await fetch(o, {
        method: 'POST',
        headers: s(),
        body: JSON.stringify(t),
      }),
      a = await e.json();
    if (!e.ok) throw new Error(a.message || 'Registration failed');
    return a;
  } catch (e) {
    throw (
      (console.error('Error during registration:', e),
      new Error(e.message || 'Something went wrong during registration'))
    );
  }
}
async function n(t) {
  t.preventDefault();
  const e = new FormData(t.target),
    a = {
      name: e.get('name'),
      email: e.get('email'),
      password: e.get('password'),
    };
  try {
    const r = await i(a);
    r && r.name && (await updateProfile(r.name, { credits: 1e3 })),
      alert('Registration successful! Redirecting to login page...'),
      (window.location.href = '/auth/login/');
  } catch (r) {
    console.error('Registration failed:', r),
      alert(`Registration failed: ${r.message}`);
  }
}
const g = document.forms.register;
g.addEventListener('submit', n);