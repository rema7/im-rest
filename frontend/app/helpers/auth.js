
const LOCAL_STORAGE_TOKEN_KEY = 'token'
const LOCAL_STORAGE_SESSION_KEY = 'session'

export const getToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
}

export const getSession = () => {
    return localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)
}

export const setToken = (token) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
}

export const setSession = (session) => {
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, session)
}

export const removeToken = () => {
    return localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
}

export const removeSession = () => {
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY)
}
