import { mapKeys } from 'lodash'
import { snakeToCamel } from 'helpers/strings'

import {
    LOGIN_RESPONSE_ERROR,
    LOGIN_RESPONSE_OK,
    LOGIN_START_REQUEST,
} from 'actions/Login'


const initialState = {
    errorMessage: null,
    loading: false,
    result: {},
    url: '/api/login',
}

export const login = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN_START_REQUEST:
            return {
                ...state,
                errorMessage: null,
                loading: true,
            }
        case LOGIN_RESPONSE_OK:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                result: mapKeys(action.data, (value, key) => (snakeToCamel(key))),
            }
        case LOGIN_RESPONSE_ERROR:
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