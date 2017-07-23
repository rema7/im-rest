import { mapKeys } from 'lodash'
import { snakeToCamel } from 'helpers/strings'

import {
    LOGIN_AUTHORISED_OK,
    LOGIN_AUTH_RESPONSE_OK,
    LOGIN_INITIALIZE,
    LOGIN_LOGOUT,
    LOGIN_RESPONSE_ERROR,
    LOGIN_RESPONSE_OK,
    LOGIN_START_REQUEST,
    LOGIN_SEND_CODE_RESPONSE_OK,
} from 'actions/Login'

const initialState = {
    errorMessage: null,
    loading: false,
    token: null,
    session: null,
    result: {},
    url: {
        login: '/api/login',
        auth: '/api/auth',
        code: '/api/auth/code',
    },
}

export const login = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN_INITIALIZE:
            return {
                ...state,
                token: action.data.token,
                session: action.data.session,
            }        
        case LOGIN_START_REQUEST:
            return {
                ...state,
                errorMessage: null,
                loading: true,
            }
        case LOGIN_AUTHORISED_OK:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                session: action.session,
            }
        case LOGIN_SEND_CODE_RESPONSE_OK:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                token: action.data.token,
                session: action.data.session,
            }
        case LOGIN_AUTH_RESPONSE_OK:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                session: action.data.session,
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
                session: null,
            }
        case LOGIN_LOGOUT:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                result: {},
                token: null,
                session: null,
            }
        default:
            return state
    }
}