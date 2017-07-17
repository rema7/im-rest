import {
    CHATS_START_REQUEST,
    CHATS_RESPONSE_OK,
    CHATS_RESPONSE_ERROR,
} from 'actions/Chats'

const initialState = {
    errorMessage: null,
    loading: false,
    items: [],
    url: '/api/chats',
}

export const chats = (state = initialState, action = {}) => {
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
                items: action.data.result,
            }
        case CHATS_RESPONSE_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                loading: false,
                items: state.items,
            }
        default:
            return state
    }
}
