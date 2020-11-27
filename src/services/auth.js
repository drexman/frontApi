export const TOKEN_KEY = 'logge-token';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
const getToken = () => localStorage.getItem(TOKEN_KEY);

export const saveToken = token => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}