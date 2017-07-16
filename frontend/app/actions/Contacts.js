import { fetchWrapper as fetch } from 'helpers/fetch'

export const CONTACTS_START_REQUEST = 'CONTACTS_START_REQUEST'
export const CONTACTS_RESPONSE_OK = 'CONTACTS_RESPONSE_OK'
export const CONTACTS_RESPONSE_ERROR = 'CONTACTS_RESPONSE_ERROR'


export function startRequest() {
    return {
        type: CONTACTS_START_REQUEST,
    }
}

export function responseOk(data) {
    return {
        type: CONTACTS_RESPONSE_OK,
        data,
    }
}

export function responseError(data) {
    return {
        type: CONTACTS_RESPONSE_ERROR,
        data,
    }
}

export const fetchContacts = () => {
    return (dispatch, getState) => {
        const state = getState()
        if (state.contacts.loading) {
            return null
        }
        dispatch(startRequest())
        const promise = fetch(state.contacts.url)
            .then((json) => {
                return dispatch(responseOk(json))
            })
            .catch((e) => {
                dispatch(responseError('Fetch contacts error'))
                throw e
            })
        return promise
    }
}
