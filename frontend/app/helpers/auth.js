
const LOCAL_STORAGE_TOKEN_KEY = 'token'
const LOCAL_STORAGE_SESSION_KEY = 'session'

export const getToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
}

export const setToken = (token) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
}

export const getSession = () => {
    return localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)
}

export const setSession = (session) => {
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, session)
}
