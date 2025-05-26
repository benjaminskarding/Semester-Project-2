const CACHE_NAME = 'api-v1';
const TTL = 1000 * 60 * 5;

async function openCache() {
  return await caches.open(CACHE_NAME);
}

/**
 * Minimal "stale-while-revalidate" fetch.
 * @param {string} url
 * @param {RequestInit} [opts]
 * @returns {Promise<any>} parsed JSON
 */
export async function cachedFetch(url, opts = {}) {
  const cache = await openCache();
  const cached = await cache.match(url);

  if (cached) {
    const age = Date.now() - new Date(cached.headers.get('date')).getTime();
    if (age < TTL) return cached.clone().json();
  }

  const res = await fetch(url, opts);
  if (res.ok) {
    const toCache = new Response(res.clone().body, {
      headers: {
        ...Object.fromEntries(res.headers),
        date: new Date().toUTCString(),
      },
    });
    cache.put(url, toCache);
    return res.json();
  }

  if (cached) return cached.json();

  throw new Error(`Request for ${url} failed: ${res.status}`);
}
