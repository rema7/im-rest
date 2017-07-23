import {
    APP_START_INIT,
    APP_FINISH_INIT,
} from 'actions/App'


const initialState = {
    loading: false,
}

export const app = (state = initialState, action = {}) => {
    switch (action.type) {
        case APP_START_INIT:
            return {
                ...state,
                loading: true,
            }
        case APP_FINISH_INIT:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}
