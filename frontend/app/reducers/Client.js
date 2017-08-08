import {
    CLIENT_CONNECTING,
    CLIENT_CATCH_ERROR,
    CLIENT_CONNECTED,
    CLIENT_DISCONNECTED,
    CLIENT_MESSAGE_RECEIVED,
} from 'actions/Client'
import {
    keysSnakeToCamel,
} from 'helpers/strings'

const initialState = {
    errorMessage: null,
    connecting: false,
    connected: false,
    messages: null,
}

export const client = (state = initialState, action = {}) => {
    const handleMessage = (message) => {
        const { payload } = message
        return keysSnakeToCamel(payload)
    }
    switch (action.type) {
        case CLIENT_CONNECTING:
            return {
                ...state,
                errorMessage: null,
                connected: false,
                connecting: true,
                messages: null,
            }
        case CLIENT_CATCH_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                connected: false,
                connecting: false,
            }
        case CLIENT_CONNECTED: {
            return {
                ...state,
                errorMessage: null,
                connecting: false,
                connected: true,
                messages: null,
            }
        }
        case CLIENT_DISCONNECTED:
            return {
                ...state,
                connecting: false,
                connected: false,
            }        
        case CLIENT_MESSAGE_RECEIVED:
            return {
                ...state,
                messages: [handleMessage(keysSnakeToCamel(action.message))],
            }
        default:
            return state
    }
}