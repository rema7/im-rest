import { fetchWrapper as fetch } from 'helpers/requests'

export const CHATS_START_REQUEST = 'CHATS_START_REQUEST'
export const CHATS_RESPONSE_OK = 'CONTACTS_RESPONSE_OK'
export const CHATS_RESPONSE_ERROR = 'CHATS_RESPONSE_ERROR'
export const CHATS_SELECT_CHAT = 'CHATS_SELECT_CHAT'


export function changeChat(chat) {
    return {
        type: CHATS_SELECT_CHAT,
        chat,
    }
}

export function startRequest() {
    return {
        type: CHATS_START_REQUEST,
    }
}

export function responseOk(data) {
    return {
        type: CHATS_RESPONSE_OK,
        data,
    }
}

export function responseError(data) {
    return {
        type: CHATS_RESPONSE_ERROR,
        data,
    }
}

export const fetchChats = () => {
    return (dispatch, getState) => {
        const state = getState()
        if (state.chats.loading) {
            return null
        }
        dispatch(startRequest())
        const promise = fetch(state.chats.url)
            .then((json) => {
                return dispatch(responseOk(json))
            })
            .catch((e) => {
                dispatch(responseError('Fetch contacts error'))
                throw e
            })
        return promise
    }
}
