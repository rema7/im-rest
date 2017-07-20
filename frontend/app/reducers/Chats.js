import {
    CHATS_START_REQUEST,
    CHATS_RESPONSE_OK,
    CHATS_RESPONSE_ERROR,
    CHATS_SELECT_CHAT,
    CHATS_SEND_MESSAGE_TO_CHAT,
    CHATS_RECEIVED_NEW_MESSAGES,
} from 'actions/Chats'
import {
    keysSnakeToCamel,
} from 'helpers/strings'

const initialState = {
    errorMessage: null,
    loading: false,
    chats: [],
    contacts: [],
    currentChat: null,
}

export const chats = (state = initialState, action = {}) => {
    const handleMessage = (chats, newMessages) => {
        newMessages.forEach((newMessage) => {
            const {chatId, content} = newMessage
            let chat = chats.find((chat) => {return chat.chatId === chatId}) 
            chat.messages.push({
                content: content,
            })
        })
        return chats
    }
    switch (action.type) {
        case CHATS_START_REQUEST:
            return {
                ...state,
                errorMessage: null,
                loading: true,
            }
        case CHATS_RESPONSE_OK:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                chats: keysSnakeToCamel(action.data.chats),
                contacts: keysSnakeToCamel(action.data.contacts),
            }
        case CHATS_RESPONSE_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                loading: false,
                chats: state.items,
            }
        case CHATS_SELECT_CHAT:
            return {
                ...state,
                currentChat: action.chat,
            }
        case CHATS_RECEIVED_NEW_MESSAGES:
            return {
                ...state,
                chats: handleMessage(state.chats, keysSnakeToCamel(action.messages)),
            }
        case CHATS_SEND_MESSAGE_TO_CHAT:
            return {
                ...state,
                chats: handleMessage(state.chats, [action.message]),
            }
        default:
            return state
    }
}
