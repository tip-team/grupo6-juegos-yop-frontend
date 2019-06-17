const TOKEN_KEY = 'AuthToken';
const getSessionStorage = () => window.sessionStorage;
const getToken = () => getSessionStorage().getItem(TOKEN_KEY);
const clear = () => getSessionStorage().clear();
const saveToken = token => getSessionStorage().setItem(TOKEN_KEY, token);

export { getToken, saveToken, clear };
