import {
    SIDEBAR_CLOSE,
    SIDEBAR_OPEN,
} from 'actions/Sidebar'

const initialState = {
    open: false,
}

export const sidebar = (state = initialState, action = {}) => {
    switch (action.type) {
        case SIDEBAR_OPEN:
            return {
                ...state,
                open: true,
            }
        case SIDEBAR_CLOSE:
            return {
                ...state,
                open: false,
            }
        default:
            return state
    }
}
