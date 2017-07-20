import { settings } from 'reducers/Settings'

describe('Settings reducer', () => {
    it('should return the initial state', () => {
        expect(settings(void 0, {})).toEqual({
            urls: {
                chats: '/api/chats',
            },
        })
    })
})
