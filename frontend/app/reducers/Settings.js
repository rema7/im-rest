const initialState = {
    urls: {
        chats: '/api/chats',
        auth: {
            login: '/api/login',
            auth: '/api/auth',
            code: '/api/auth/code',
        },
    },
}

export const settings = (state = initialState, action = {}) => {
    switch (action.type) {
        default:
            return state
    }
}