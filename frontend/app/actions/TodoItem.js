import { fetchWrapper as fetch } from 'helpers/fetch'
import { postWrapper as post } from 'helpers/post'

export const TODO_ITEM_RESPONSE_ERROR = 'TODO_ITEM_RESPONSE_ERROR'
export const TODO_ITEM_START_REQUEST = 'TODO_ITEM_START_REQUEST'
export const TODO_ITEM_RESPONSE_OK = 'TODO_ITEM_RESPONSE_OK'


export const responseError = (errorMessage) => {
    return {
        type: TODO_ITEM_RESPONSE_ERROR,
        errorMessage,
    }
}

export const startRequest = () => {
    return {
        type: TODO_ITEM_START_REQUEST,
    }
}

export const responseOk = (data) => {
    return {
        type: TODO_ITEM_RESPONSE_OK,
        data,
    }
}

export const fetchTodoItem = (todoId) => {
    return (dispatch, getState) => {
        const state = getState()
        if (state.settings.loading) {
            return null
        }
        dispatch(startRequest())
        return fetch(state.todo.url+'/'+todoId)
            .then((json) => {
                return dispatch(responseOk(json))
            })
            .catch((e) => {
                dispatch(responseError('Todo item response failed'))
                throw e
            })
    }
}

export const saveTodoItem = (params) => {
    return (dispatch, getState) => {
        const state = getState()
        if (state.settings.loading) {
            return null
        }
        dispatch(startRequest())
        
        return post(state.todo.url, params)
            .then((json) => {
                if (json.error) {
                    dispatch(responseError('error'))
                    return
                }
                dispatch(responseOk(json))
            })
            .catch((e) => {
                dispatch(responseError('Can\'t save Todo'))
                throw e
            })
    }
}
