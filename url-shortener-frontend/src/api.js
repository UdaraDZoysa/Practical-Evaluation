import axios from 'axios';

const api = axios.create({
  baseURL: '/api',          // vite proxy 
  timeout: 4000,
});

// helper so every call either returns data or throws nice Error
async function safe(promise) {
  try {
    const { data } = await promise;
    return data;
  } catch (err) {
    const msg =
      err.response?.data?.error ??
      err.message ??
      'Network / server error';
    throw new Error(msg);
  }
}


export async function listUrls() {
  // GET /api/urls  →  [{id, originalUrl, shortCode, clicks, expiresAt, createdAt}]
  return safe(api.get('/urls'));
}

export async function createUrl({ originalUrl, customAlias, expiresInDays }) {
  // POST /api/urls { originalUrl, alias?, expiresInDays? } → { shortCode }
  const payload = { originalUrl, alias: customAlias, expiresInDays };
  const { shortCode } = await safe(api.post('/urls', payload));
  return { originalUrl, shortCode };
}

export async function deleteUrl(id) {
  // DELETE /api/urls/{id}
  await safe(api.delete(`/urls/${id}`));
}

export async function incClick(id) {
  // Optional: PATCH /api/urls/{id}/click
  return safe(api.patch(`/urls/${id}/click`));
}
