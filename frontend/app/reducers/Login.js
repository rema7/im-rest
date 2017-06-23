import { mapKeys } from 'lodash'
import { snakeToCamel } from 'helpers/strings'

import {
    LOGIN_RESPONSE_ERROR,
    LOGIN_RESPONSE_OK,
    LOGIN_START_REQUEST,
    LOGIN_SEND_CODE_RESPONSE_OK,
    LOGIN_LOGOUT,
} from 'actions/Login'


const initialState = {
    errorMessage: null,
    loading: false,
    token: null,
    result: {},
    url: {
        login: '/api/login',
        code: '/api/auth/code',
    },
}

export const login = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN_START_REQUEST:
            return {
                ...state,
                errorMessage: null,
                loading: true,
            }
        case LOGIN_SEND_CODE_RESPONSE_OK:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                token: snakeToCamel(action.data.token),
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
                token: null,
            }
        case LOGIN_LOGOUT:
            return {
                ...state,
                errorMessage: null,
                loading: true,
                result: {},
                token: null,
            }
        default:
            return state
    }
}