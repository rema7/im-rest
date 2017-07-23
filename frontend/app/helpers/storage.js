
const LOCAL_STORAGE_TOKEN_KEY = 'token'

export const getToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
}

export const setToken = (token) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
}

export const removeToken = () => {
    return localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
}
