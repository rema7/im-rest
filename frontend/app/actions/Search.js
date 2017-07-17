import {
    fetchWrapper as request,
    onAbort,
} from 'helpers/fetch'

export const SEARCH_START_FETCHING = 'SEARCH_START_FETCHING'
export const SEARCH_UPDATE_ERROR = 'SEARCH_UPDATE_ERROR'
export const SEARCH_UPDATE_RESULT = 'SEARCH_UPDATE_RESULT'

export function startFetching() {
    return {
        type: SEARCH_START_FETCHING,
    }
}

export function updateSearchResult(data) {
    return {
        type: SEARCH_UPDATE_RESULT,
        data,
    }
}

export function updateError(error) {
    return {
        type: SEARCH_UPDATE_ERROR,
        error,
    }
}

export function fetchSearchResult() {
    return (dispatch, getState) => {
        const state = getState()

        if (state.searchResult.isFetching) {
            return
        }

        dispatch(startFetching())

        const url = state.urls.searchList
        const query = {
            search: state.searchResult.term,
        }
        const req = request(url, { query })
        onAbort(req, () => {
            dispatch(updateError())
        })
        req.then((json) => {
            if (json.error) {
                dispatch(updateError(json))
            } else {
                dispatch(updateSearchResult(json))
            }
        })
        .catch(() => {
            dispatch(updateError({ error: 'Произошла ошибка. Повторите попытку позже'}))
        })
        return req
    }
}