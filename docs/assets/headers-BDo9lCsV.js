const o = '19ef7225-210e-45cc-9302-9b72b74f8e5d',
  s = 'https://v2.api.noroff.dev',
  t = `${s}/auth`,
  c = `${t}/login`,
  r = `${t}/register`,
  a = `${s}/auction`,
  i = `${a}/profiles`,
  A = `${a}/listings`;
function I() {
  return new Headers({
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': o,
  });
}
function p() {
  const e = new Headers({
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': o,
    }),
    n = localStorage.getItem('accessToken');
  return (
    n
      ? e.append('Authorization', `Bearer ${n}`)
      : console.warn('Access token is missing in localStorage!'),
    e
  );
}
export { c as A, r as a, A as b, p as c, i as d, I as p };
