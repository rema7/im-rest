import { settings } from 'reducers/Settings'

const intialState = {
    urls: {
        chats: '/api/chats',
        auth: {
            login: '/api/login',
            auth: '/api/auth',
            code: '/api/auth/code',
        },
        account: '/api/account',
        ws: 'ws://localhost:8100/ws',
    },
}

describe('Settings reducer', () => {
    it('should return the initial state', () => {
        expect(settings(void 0, {})).toEqual(intialState)
    })
})
