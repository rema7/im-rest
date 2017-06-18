import { fetchWrapper as fetch } from 'helpers/fetch'

export const TODO_RESPONSE_ERROR = 'TODO_RESPONSE_ERROR'
export const TODO_START_REQUEST = 'TODO_START_REQUEST'
export const TODO_RESPONSE_OK = 'TODO_RESPONSE_OK'


export const responseError = (errorMessage) => {
    return {
        type: TODO_RESPONSE_ERROR,
        errorMessage,
    }
}

export const startRequest = () => {
    return {
        type: TODO_START_REQUEST,
    }
}

export const responseOk = (data) => {
    return {
        type: TODO_RESPONSE_OK,
        data,
    }
}

export const fetchTodo = () => {
    return (dispatch, getState) => {
        const state = getState()
        if (state.settings.loading) {
            return null
        }
        dispatch(startRequest())
        return fetch(state.todo.url)
            .then((json) => {
                return dispatch(responseOk(json))
            })
            .catch((e) => {
                dispatch(responseError('PromoCodes response failed'))
                throw e
            })
    }
}
