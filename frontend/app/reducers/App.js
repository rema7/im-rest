import {
    APP_LOADING,
    APP_LOADED,
} from 'actions/App'


const initialState = {
    loading: false,
}

export const app = (state = initialState, action = {}) => {
    switch (action.type) {
        default:
            return state
    }
}
