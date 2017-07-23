import { mapKeys } from 'lodash'
import { snakeToCamel } from 'helpers/strings'

import {
    LOGIN_INITIALIZE,
    LOGIN_LOGOUT,
    LOGIN_RESPONSE_ERROR,
    LOGIN_RESPONSE_OK,
    LOGIN_SEND_CODE_RESPONSE_OK,
    LOGIN_START_REQUEST,
} from 'actions/Login'

const initialState = {
    errorMessage: null,
    loading: false,
    token: null,
    auth: null,
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
        case LOGIN_SEND_CODE_RESPONSE_OK:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                token: action.data.token,
                auth: null,
            }
        case LOGIN_RESPONSE_OK:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                token: null,
                auth: mapKeys(action.data, (value, key) => (snakeToCamel(key))),
            }
        case LOGIN_RESPONSE_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                loading: false,
                token: null,
            }
        case LOGIN_LOGOUT:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                token: null,
                auth: null,
            }
        default:
            return state
    }
}