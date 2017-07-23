const initialState = {
    urls: {
        chats: '/api/chats',
        auth: {
            login: '/api/login',
            auth: '/api/auth',
            code: '/api/auth/code',
        },
        ws: 'ws://localhost:8100/ws',
    },
}

export const settings = (state = initialState, action = {}) => {
    switch (action.type) {
        default:
            return state
    }
}
