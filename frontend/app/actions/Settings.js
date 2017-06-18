import { fetchWrapper as fetch } from 'helpers/fetch'

export const SETTINGS_START_REQUEST = 'SETTINGS_START_REQUEST'
export const SETTINGS_RESPONSE_OK = 'SETTINGS_RESPONSE_OK'
export const SETTINGS_RESPONSE_ERROR = 'SETTINGS_RESPONSE_ERROR'

export function startRequest() {
    return {
        type: SETTINGS_START_REQUEST,
    }
}

export function responseOk(data) {
    return {
        type: SETTINGS_RESPONSE_OK,
        data,
    }
}

export function responseError(errorMessage) {
    return {
        type: SETTINGS_RESPONSE_ERROR,
        errorMessage,
    }
}

export const fetchSettings = () => {
    return (dispatch, getState) => {
        const state = getState()
        if (state.settings.loading) {
            return null
        }
        dispatch(startRequest())
        const promise = fetch(state.settings.url)
            .then((json) => {
                return dispatch(responseOk(json))
            })
            .catch((e) => {
                dispatch(responseError('Settings request failed'))
                throw e
            })
        return promise
    }
}