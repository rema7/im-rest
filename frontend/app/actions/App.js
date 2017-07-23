import { initFromStorage } from 'actions/Login'

export const APP_START_INIT = 'APP_START_INIT'
export const APP_FINISH_INIT = 'APP_FINISH_INIT'


export function startInit() {
    return {
        type: APP_START_INIT,
    }
}

export function finishInit() {
    return {
        type: APP_FINISH_INIT,
    }
}

export const init = () => {
    return (dispatch, getState) => {
        const state = getState()
        if (state.app.loading) {
            return null
        }
        dispatch(startInit())
        const promise = new Promise((resolve) => {
            dispatch(initFromStorage())
            resolve()
        }).then((json) => {
            return dispatch(finishInit(json))
        }).catch((e) => {
            throw e
        })
        return promise
    }
}