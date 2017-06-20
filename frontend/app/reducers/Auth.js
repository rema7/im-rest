import { mapKeys } from 'lodash'
import { snakeToCamel } from 'helpers/strings'

import {
    AUTH_RESPONSE_ERROR,
    AUTH_RESPONSE_OK,
    AUTH_START_REQUEST,
} from 'actions/Auth'


const initialState = {
    errorMessage: null,
    loading: false,
    result: {},
    url: '/api/auth',
}

export const auth = (state = initialState, action = {}) => {
    switch (action.type) {
        case AUTH_START_REQUEST:
            return {
                ...state,
                errorMessage: null,
                loading: true,
            }
        case AUTH_RESPONSE_OK:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                result: mapKeys(action.data, (value, key) => (snakeToCamel(key))),
            }
        case AUTH_RESPONSE_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                loading: false,
                result: {},
            }
        default:
            return state
    }
}