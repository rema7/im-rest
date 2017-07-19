import { forEach } from 'lodash'

export const snakeToCamel = (string) => {
    return string.replace(/(\_[a-z])/g, (item) => item.toUpperCase().replace('_', ''))
}

export const camelToSnake = (string) => {
    return string.replace(/([A-Z])/g, (item) => '_' + item.toLowerCase())
}

export const keysSnakeToCamel = function(obj) {
    if(obj instanceof Array) {
        const res = obj.map((value) => keysSnakeToCamel(value))
        return res 
    } else {
        let result = {}
        forEach(obj, (value, key) => {
            if (value instanceof Array) {
                value = keysSnakeToCamel(obj[key])
            }
            result[snakeToCamel(key)] = value 
        })

        return result
    }
}

export const keysCamelToSnake = function(obj) {
    if(obj instanceof Array) {
        return obj.map((value) => keysCamelToSnake(value)) 
    } else {
        let result = {}
        forEach(obj, (value, key) => {
            if (value instanceof Array) {
                value = keysCamelToSnake(obj[key])
            }
            result[camelToSnake(key)] = value 
        })

        return result
    }
}
