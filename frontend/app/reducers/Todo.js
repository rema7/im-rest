import {
    TODO_RESPONSE_ERROR,
    TODO_START_REQUEST,
    TODO_RESPONSE_OK,
} from 'actions/Todo'

const initialState = {
    errorMessage: null,
    items: [],
    loading: false,
    url: '/api/todo',
}

export const todo = (state = initialState, action = {}) => {
    switch (action.type) {
        case TODO_START_REQUEST:
            return {
                ...state,
                errorMessage: null,
                loading: true,
            }
        case TODO_RESPONSE_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                items: action.errorMessage ? [] : action.items,
                loading: false,
            }
        case TODO_RESPONSE_OK:
            return {
                ...state,
                errorMessage: null,
                items: action.data.result,
                loading: false,
            }
        default:
            return state
    }
}