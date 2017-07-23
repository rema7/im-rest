import * as actions from 'actions/Client'
import { client } from 'reducers/Client'

const initialState = {
    errorMessage: null,
    connecting: false,
    connected: false,
    messages: null,
}

describe('Client reducer', () => {
    it('should return the initial state', () => {
        expect(client(void 0, {})).toEqual(initialState)
    })

    it('should change connecting state after connecting action', () => {
        const action = {
            type: actions.CLIENT_CONNECTING,
            data: null,
        }
        const state = client(initialState, action)
        expect(state).toEqual({
            errorMessage: null,
            connecting: true,
            connected: false,
            messages: null,
        })
    })

    it('should change connecting and errorMessage state after connectionError action', () => {
        const action = {
            type: actions.CLIENT_CONNECTION_ERROR,
            errorMessage: 'Error happened',
        }
        const state = client({
            ...initialState,
            connecting: true,
        }, action)
        expect(state).toEqual({
            errorMessage: 'Error happened',
            connecting: false,
            connected: false,
            messages: null,
        })
    })

    it('should change connecting state after connected action', () => {
        const action = {
            type: actions.CLIENT_CONNECTED,
        }
        const state = client({
            ...initialState,
            connecting: true,
        }, action)
        expect(state).toEqual({
            errorMessage: null,
            connecting: false,
            connected: true,
            messages: null,
        })
    })

    it('should change connected state after dicconnect action', () => {
        const action = {
            type: actions.CLIENT_DISCONNECTED,
        }
        const state = client({
            ...initialState,
            connected: true,
        }, action)
        expect(state).toEqual({
            errorMessage: null,
            connecting: false,
            connected: false,
            messages: null,
        })
    })

    it('should change messages state after dicconnect action', () => {
        const action = {
            type: actions.CLIENT_MESSAGE_RECEIVED,
            message: {
                payload: {
                    content: '1',
                },
            },
        }
        const state = client({
            ...initialState,
            connected: true,
        }, action)
        expect(state).toEqual({
            errorMessage: null,
            connecting: false,
            connected: true,
            messages: [{
                content: '1',
            }],
        })
    })
})
