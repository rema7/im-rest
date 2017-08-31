import { 
    postWrapper as post,
    fetchWrapper as fetch,
} from 'helpers/post'


export const ACCOUNT_START_REQUEST = 'ACCOUNT_START_REQUEST'
export const ACCOUNT_RESPONSE_ERROR = 'ACCOUNT_RESPONSE_ERROR'
export const ACCOUNT_RESPONSE_OK = 'ACCOUNT_RESPONSE_OK'

export function startRequest() {
    return {
        type: ACCOUNT_START_REQUEST,
    }
}

export function responseOk(data) {
    return {
        type: ACCOUNT_RESPONSE_OK,
        data,
    }
}

export function responseError(errorMessage) {
    return {
        type: ACCOUNT_RESPONSE_ERROR,
        errorMessage,
    }
}

export const fetchAccount = () => {
    return (dispatch, getState) => {
        const state = getState()
        if (state.login.loading) {
            return null
        }
        dispatch(startRequest())

        const promise = fetch(state.settings.urls.profile)
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

export const updateAccount = () => {
    return (dispatch, getState) => {
        const state = getState()
        if (state.login.loading) {
            return null
        }
        dispatch(startRequest())

        const promise = post(state.settings.urls.profile)
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
