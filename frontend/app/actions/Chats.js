import { notifyNewMessages } from 'actions/Notifications'
import { fetchWrapper as fetch } from 'helpers/requests'

export const CHATS_START_REQUEST = 'CHATS_START_REQUEST'
export const CHATS_RESPONSE_OK = 'CHATS_RESPONSE_OK'
export const CHATS_RESPONSE_ERROR = 'CHATS_RESPONSE_ERROR'
export const CHATS_SELECT_CHAT = 'CHATS_SELECT_CHAT'
export const CHATS_SEND_MESSAGE_TO_CHAT = 'CHATS_SEND_MESSAGE_TO_CHAT'
export const CHATS_RECEIVED_NEW_MESSAGES = 'CHATS_RECEIVED_NEW_MESSAGES'
export const CHATS_NEW_MESSAGES_READ = 'CHATS_NEW_MESSAGES_READ'


export function newMessagesRead(chatId) {
    return {
        type: CHATS_NEW_MESSAGES_READ,
        chatId,
    }
}

export function receivedNewMessages(messages) {
    return {
        type: CHATS_RECEIVED_NEW_MESSAGES,
        messages,
    }
}

export function sendMessage(message) {
    return {
        type: CHATS_SEND_MESSAGE_TO_CHAT,
        message,
    }
}

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
        const promise = fetch(state.settings.urls.chats)
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

export const updateChatsMessages = (messages) => {
    return (dispatch) => {
        dispatch(receivedNewMessages(messages))
        messages.forEach((message) => {
            const { chatId } = message
            dispatch(notifyNewMessages({chatId}))
        })
    }
}

