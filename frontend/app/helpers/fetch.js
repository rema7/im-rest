import { get } from 'lodash'
import request from 'superagent'

export const fetchWrapper = (url, options) => {
    const params = Object.assign({}, options)
    const headers = Object.assign({}, {
        Accept: 'application/json',
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
        // if ([401, 409].includes(response.status)) {
        //     return response.response.body
        // }
        throw response
    })
}
