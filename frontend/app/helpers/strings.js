export const snakeToCamel = (string) => {
    return string.replace(/(\_[a-z])/g, (item) => item.toUpperCase().replace('_', ''))
}

export const camelToSnake = (string) => {
    return string.replace(/([A-Z])/g, (item) => '_' + item.toLowerCase())
}
