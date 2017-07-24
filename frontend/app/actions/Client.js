export const CLIENT_CONNECT = 'CLIENT_CONNECT'
export const CLIENT_CATCH_ERROR = 'CLIENT_CATCH_ERROR'
export const CLIENT_CONNECTING = 'CLIENT_CONNECTING'
export const CLIENT_CONNECTED = 'CLIENT_CONNECTED'
export const CLIENT_DISCONNECT = 'CLIENT_DISCONNECT'
export const CLIENT_DISCONNECTED = 'CLIENT_DISCONNECTED'
export const CLIENT_MESSAGE_RECEIVED = 'CLIENT_MESSAGE_RECEIVED'
export const CLIENT_SEND_MESSAGE = 'CLIENT_SEND_MESSAGE'
export const CLIENT_SWITCH_RECONNECT = 'CLIENT_SWITCH_RECONNECT'


export function connect(url, token) {
    return {
        type: CLIENT_CONNECT,
        url,
        token,
    }
}

export function switchReconnect() {
    return {
        type: CLIENT_SWITCH_RECONNECT,
    }
}


export function catchError(errorMessage) {
    return {
        type: CLIENT_CATCH_ERROR,
        errorMessage,
    }
}


export function disconnect() {
    return {
        type: CLIENT_DISCONNECT,
    }
}

export function send(message) {
    return {
        type: CLIENT_SEND_MESSAGE,
        message,
    }
}

export function connecting() {
    return {
        type: CLIENT_CONNECTING,
    }
}

export function connected() {
    return {
        type: CLIENT_CONNECTED,
    }
}

export function messageReceived(message) {
    return {
        type: CLIENT_MESSAGE_RECEIVED,
        message,
    }
}

export function disconnected() {
    return {
        type: CLIENT_DISCONNECTED,
    }
}

export function wsConnect() {
    return (dispatch, getState) => {
        const state = getState()
        if (state.login.loading) {
            return null
        }
        const token = state.login.token
        if (!token) {
            return dispatch(catchError('No token key'))
        }
        const url = state.settings.urls.ws
        dispatch(connect(url, token))
    }
}
