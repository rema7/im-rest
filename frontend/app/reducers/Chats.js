import {
    CHATS_START_REQUEST,
    CHATS_RESPONSE_OK,
    CHATS_RESPONSE_ERROR,
    CHATS_SELECT_CHAT,
    CHATS_SEND_MESSAGE_TO_CHAT,
    CHATS_RECEIVED_NEW_MESSAGE,
    CHATS_NEW_MESSAGES_READ,
    CHATS_MARK_MESSAGES_AS_READ,
} from 'actions/Chats'
import {
    keysSnakeToCamel,
} from 'helpers/strings'

const initialState = {
    errorMessage: null,
    loading: false,
    chats: [],
    currentChat: null,
}

export const chats = (state = initialState, action = {}) => {
    const handleMessage = (chats, newMessage) => {
        const {chatId, senderId, content} = newMessage
        let chat = chats.find((chat) => {return chat.chatId === chatId})
        chat.messages = [...chat.messages, {
            senderId,
            content,
            state: 'new',
        }]
        chat.newMessagesCount += 1
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
                chats: action.data.chats.map((chat) => {
                    return {
                        ...keysSnakeToCamel(chat),
                        newMessagesCount: 0,
                    }
                }),
            }
        case CHATS_RESPONSE_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                loading: false,
                chats: state.chats,
            }
        case CHATS_SELECT_CHAT:
            return {
                ...state,
                currentChat: state.chats.find((chat) => chat.chatId === action.chatId),
            }
        case CHATS_RECEIVED_NEW_MESSAGE:
            return {
                ...state,
                chats: handleMessage(state.chats, keysSnakeToCamel(action.message)),
            }
        case CHATS_SEND_MESSAGE_TO_CHAT:
            return {
                ...state,
                chats: handleMessage(state.chats, action.message),
            }
        case CHATS_NEW_MESSAGES_READ:
            return {
                ...state,
                chats: state.chats.map((chat) => {
                    return chat
                }),
            }
        case CHATS_MARK_MESSAGES_AS_READ:
            return {
                ...state,
                chats: state.chats.map((chat) => {
                    if (chat.chatId === action.chatId) {
                        chat.messages.forEach((m) => {
                            if (m.state === 'new') {
                                m.state = 'read'
                            }
                        })
                        chat.newMessagesCount = 0
                    }
                    return chat
                }),
            }
        default:
            return state
    }
}
