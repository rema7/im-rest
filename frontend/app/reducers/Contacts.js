import {
    CONTACTS_START_REQUEST,
    CONTACTS_RESPONSE_OK,
    CONTACTS_RESPONSE_ERROR,
} from 'actions/Contacts'

const initialState = {
    errorMessage: null,
    loading: false,
    items: [],
    url: '/api/contacts',
}

export const contacts = (state = initialState, action = {}) => {
    switch (action.type) {
        case CONTACTS_START_REQUEST:
            return {
                ...state,
                errorMessage: null,
                loading: true,
            }
        case CONTACTS_RESPONSE_OK:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                items: [],
            }
        case CONTACTS_RESPONSE_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                loading: false,
                items: state.items,
            }
        default:
            return state
    }
}
