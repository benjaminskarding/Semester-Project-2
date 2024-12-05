import { A as c, p as i } from './headers-BDo9lCsV.js';
async function l({ email: r, password: s }) {
  try {
    const o = await fetch(c, {
        method: 'POST',
        headers: i(),
        body: JSON.stringify({ email: r, password: s }),
      }),
      e = await o.json();
    if (!o.ok) throw new Error(e.message || 'Login failed');
    const n = e.data?.accessToken,
      a = e.data?.name;
    if (!n || !a)
      throw (
        (console.error('Invalid API response structure:', e),
        new Error('Invalid API response: missing accessToken or name.'))
      );
    return e;
  } catch (o) {
    throw (console.error('Error during login:', o), o);
  }
}
async function d(r) {
  r.preventDefault();
  const s = new FormData(r.target),
    o = { email: s.get('email'), password: s.get('password') };
  try {
    const e = await l(o),
      n = e.data.accessToken,
      a = e.data.name;
    if (!n) throw new Error('Access token not found in login response.');
    localStorage.setItem('accessToken', n),
      localStorage.setItem('username', a),
      alert('Logged in successfully! Redirecting to your dashboard...'),
      (window.location.href = '/');
  } catch (e) {
    console.error('Login failed:', e), alert(`Login failed: ${e.message}`);
  }
}
const t = document.forms.login;
t
  ? t.addEventListener('submit', d)
  : console.error('Form not found! Ensure the form exists.');
