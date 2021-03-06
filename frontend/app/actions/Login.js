// import { batchActions } from 'redux-batched-actions'

import { postWrapper as post } from 'helpers/post'
import { keysCamelToSnake } from 'helpers/strings'
import { disconnect } from 'actions/Client'
import {
    getToken,
    setToken,
    removeToken,
} from 'helpers/storage'

export const LOGIN_INITIALIZE = 'LOGIN_INITIALIZE'
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT'
export const LOGIN_SEND_CODE_RESPONSE_OK = 'LOGIN_SEND_CODE_RESPONSE_OK'
export const LOGIN_START_REQUEST = 'LOGIN_START_REQUEST'
export const LOGIN_RESPONSE_ERROR = 'LOGIN_RESPONSE_ERROR'
export const LOGIN_RESPONSE_OK = 'LOGIN_RESPONSE_OK'

export function initFromStorage() {
    const data = {
        token: getToken(),
    }
    return {
        type: LOGIN_INITIALIZE,
        data,
    }
}

export function startRequest() {
    return {
        type: LOGIN_START_REQUEST,
    }
}

export function responseOk(data) {
    return {
        type: LOGIN_RESPONSE_OK,
        data,
    }
}

export function codeResponseOk(data) {
    return {
        type: LOGIN_SEND_CODE_RESPONSE_OK,
        data,
    }
}

export function responseError(errorMessage) {
    return {
        type: LOGIN_RESPONSE_ERROR,
        errorMessage,
    }
}

export function logoutAction() {
    removeToken()
    return {
        type: LOGIN_LOGOUT,
    }
}

export const logout = () => {
    return (dispatch) => {
        let promise = new Promise((resolve) => resolve())

        dispatch(logoutAction())
        dispatch(disconnect())
        // dispatch(batchActions([
        //     logoutAction(),
        //     disconnect(),
        // ]))
        return promise
    }
}

export const login = (email) => {
    return (dispatch, getState) => {
        const state = getState()
        if (state.login.loading) {
            return null
        }
        dispatch(startRequest())

        const promise = post(state.settings.urls.auth.login, {email:email})
            .then((json) => {
                return dispatch(responseOk(json))
            })
            .catch((e) => {
                dispatch(responseError('Login request failed'))
                throw e
            })
        return promise
    }
}

export const sendCode = (obj) => {
    return (dispatch, getState) => {
        const state = getState()
        if (state.login.loading) {
            return null
        }
        dispatch(startRequest())
        obj = keysCamelToSnake(obj)
        const promise = post(state.settings.urls.auth.code, obj)
            .then((json) => {
                const { token } = json
                setToken(token)
                return dispatch(codeResponseOk(json))
            })
            .catch((e) => {
                dispatch(responseError('Send codeuth request failed'))
                throw e
            })
        return promise
    }
}
