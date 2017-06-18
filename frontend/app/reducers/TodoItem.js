import {
    TODO_ITEM_RESPONSE_ERROR,
    TODO_ITEM_START_REQUEST,
    TODO_ITEM_RESPONSE_OK,
} from 'actions/TodoItem'

const initialState = {
    errorMessage: null,
    item: null,
    loading: false,
    url: '/api/todo',
}

export const todoItem = (state = initialState, action = {}) => {
    switch (action.type) {
        case TODO_ITEM_START_REQUEST:
            return {
                ...state,
                errorMessage: null,
                loading: true,
            }
        case TODO_ITEM_RESPONSE_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                item: action.errorMessage ? null : action.item,
                loading: false,
            }
        case TODO_ITEM_RESPONSE_OK:
            return {
                ...state,
                errorMessage: null,
                item: action.data.result,
                loading: false,
            }
        default:
            return state
    }
}
