import request from 'superagent'

export const postWrapper = (url, body) => {
    const headers = Object.assign({}, {
        Accept: 'application/json',
    })

    let req = request('POST', url).set(headers).send(body)

    return req.then((response) => {
        if (response.body && response.body.error_code && response.body.error_code === 401) {
            response.body.error = 'An error occured. Try again later.'
        }
        return response.body
    }).catch((response) => {
        throw response
    })
}