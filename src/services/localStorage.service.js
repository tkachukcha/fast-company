const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';

export function setTokens({ refreshToken, expiresIn = 3600, idToken }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function getAccessToken() {
  localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  localStorage.getItem(REFRESH_KEY);
}

export function getExpiresToken() {
  localStorage.getItem(EXPIRES_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresToken
};

export default localStorageService;
