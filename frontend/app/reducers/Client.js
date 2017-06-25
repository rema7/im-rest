import {
    CLIENT_CONNECTING,
    CLIENT_CONNECTION_ERROR,
    CLIENT_CONNECTED,
    CLIENT_DISCONNECT,
    CLIENT_DISCONNECTED,
    SEND_CHAT_MESSAGE,
    CLIENT_MESSAGE_RECEIVED,
} from 'actions/Client'

const initialState = {
    errorMessage: null,
    connecting: false,
    connected: false,
    messages: [],
    url: 'ws://localhost:8100/ws',
}

export const client = (state = initialState, action = {}) => {
    switch (action.type) {
        case CLIENT_CONNECTING:
            return {
                ...state,
                errorMessage: null,
                connected: false,
                connecting: true,
            }
        case CLIENT_CONNECTION_ERROR:
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
            }
        }
        case CLIENT_DISCONNECT:
            return {
                ...state,
                errorMessage: null,
            }
        case CLIENT_DISCONNECTED:
            return {
                ...state,
                connected: false,
            }        
        case SEND_CHAT_MESSAGE:
            return {
                ...state,
            }
        case CLIENT_MESSAGE_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, action.message],
            }
        default:
            return state
    }
}