import { mapKeys } from 'lodash'
import { snakeToCamel } from 'helpers/strings'

import {
    SETTINGS_RESPONSE_ERROR,
    SETTINGS_RESPONSE_OK,
    SETTINGS_START_REQUEST,
} from 'actions/Settings'


const initialState = {
    errorMessage: null,
    loading: false,
    values: {},
    url: '/api/settings',
}

export const settings = (state = initialState, action = {}) => {
    switch (action.type) {
        case SETTINGS_START_REQUEST:
            return {
                ...state,
                errorMessage: null,
                loading: true,
            }
        case SETTINGS_RESPONSE_OK:
            return {
                ...state,
                errorMessage: null,
                loading: false,
                values: mapKeys(action.data, (value, key) => (snakeToCamel(key))),
            }
        case SETTINGS_RESPONSE_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                loading: false,
                values: {},
            }
        default:
            return state
    }
}