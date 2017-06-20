import { postWrapper as post } from 'helpers/post'

export const LOGIN_START_REQUEST = 'LOGIN_START_REQUEST'
export const LOGIN_RESPONSE_OK = 'LOGIN_RESPONSE_OK'
export const LOGIN_RESPONSE_ERROR = 'LOGIN_RESPONSE_ERROR'

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

export function responseError(errorMessage) {
    return {
        type: LOGIN_RESPONSE_ERROR,
        errorMessage,
    }
}

export const login = (email) => {
    return (dispatch, getState) => {
        const state = getState()
        if (state.login.loading) {
            return null
        }
        dispatch(startRequest())
        const promise = post(state.login.url, {email:email})
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