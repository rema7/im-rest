import { mapKeys } from 'lodash'

export const snakeToCamel = (string) => {
    return string.replace(/(\_[a-z])/g, (item) => item.toUpperCase().replace('_', ''))
}

export const camelToSnake = (string) => {
    return string.replace(/([A-Z])/g, (item) => '_' + item.toLowerCase())
}

export const keysSnakeToCamel = function(obj) {
    return mapKeys(obj, (value, key) => (snakeToCamel(key)))
}

export const keysCamelToSnake = function(obj) {
    return mapKeys(obj, (value, key) => (camelToSnake(key)))
}
