import { get } from 'lodash'
import request from 'superagent'
import { getSession } from 'helpers/auth'

export const fetchWrapper = (url, options) => {
    const params = Object.assign({}, options)
    const headers = Object.assign({}, {
        Accept: 'application/json',
        Authorization: getSession(),
    }, params.headers)

    const method = get(params, 'method', 'GET')
    let req = request(method, url).set(headers)
    // if (!isEmpty(params.query)) {
    //     req = req.query(params.query)
    // } else if (!isEmpty(params.body)) {
    //     req = req.send(params.body)
    // }
    return req.then((response) => {
        if (response.body && response.body.error_code && response.body.error_code === 401) {
            response.body.error = 'An error occured. Try again later.'
        }
        return response.body
    }).catch((response) => {
        if ([401, 409].includes(response.status)) {
            return {
                status: response.status, 
                body: response.response.body,
            }
        }
        throw response
    })
}

export const postWrapper = (url, body) => {
    const headers = Object.assign({}, {
        Accept: 'application/json',
        Authorization: getSession(),
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

export const onAbort = (req, callback) => {
    req.on('abort', () => {
        if (req.xhr.readyState !== 4) {
            callback()
        }
    })
}