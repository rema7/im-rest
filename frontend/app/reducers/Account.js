import {
    ACCOUNT_START_REQUEST,
    ACCOUNT_RESPONSE_ERROR,
    ACCOUNT_RESPONSE_OK,
} from 'actions/Account'
import { keysSnakeToCamel } from 'helpers/strings'

const initialState = {
    errorMessage: null,
    loading: false,
    account: null,
}

export const account = (state = initialState, action = {}) => {
    switch (action.type) {
        case ACCOUNT_START_REQUEST:
            return {
                ...state,
                errorMessage: null,
                loading: true,
            }
        case ACCOUNT_RESPONSE_OK:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                chats: keysSnakeToCamel(action.data.result),
            }
        case ACCOUNT_RESPONSE_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                loading: false,
                account: state.account,
            }
        default:
            return state
    }
}
