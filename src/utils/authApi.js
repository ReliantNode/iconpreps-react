const ENDPOINT = process.env.REACT_APP_FEEDBACK_API;

export async function getAuthUser() {
  try {
    const response = await fetch(`${ENDPOINT}/me`, { credentials: 'include' });
    if (response.status !== 200) return null;
    return response.json();
  } catch (_error) {
    return null;
  }
}

export async function getAuthToken() {
  // TODO: session Set-Cookie header from here needs SameSite=None ???
  const response = await fetch(`${ENDPOINT}/login`, { credentials: 'include' });
  const { token } = await response.json();
  return token;
}

export async function login(address, signature) {
  const response = await fetch(`${ENDPOINT}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      username: address,
      signature,
    }),
  });
  return response.json();
}

export async function logout() {
  const response = await fetch(`${ENDPOINT}/logout`, { credentials: 'include' });
  return response.json();
}
