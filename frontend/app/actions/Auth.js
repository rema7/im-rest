import { postWrapper as post } from 'helpers/post'

export const AUTH_START_REQUEST = 'AUTH_START_REQUEST'
export const AUTH_RESPONSE_OK = 'AUTH_RESPONSE_OK'
export const AUTH_RESPONSE_ERROR = 'AUTH_RESPONSE_ERROR'

export function startRequest() {
    return {
        type: AUTH_START_REQUEST,
    }
}

export function responseOk(data) {
    return {
        type: AUTH_RESPONSE_OK,
        data,
    }
}

export function responseError(errorMessage) {
    return {
        type: AUTH_RESPONSE_ERROR,
        errorMessage,
    }
}

export const auth = (obj) => {
    return (dispatch, getState) => {
        const state = getState()
        if (state.auth.loading) {
            return null
        }
        dispatch(startRequest())
        const promise = post(state.auth.url, obj)
            .then((json) => {
                return dispatch(responseOk(json))
            })
            .catch((e) => {
                dispatch(responseError('Auth request failed'))
                throw e
            })
        return promise
    }
}