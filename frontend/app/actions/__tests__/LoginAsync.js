import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import 'jest-localstorage-mock'

import * as loginActions from 'actions/Login'

const host = 'http://test.iv'

const initialStore = {
    app: {
        loading: false,
    },
    login: {
        errorMessage: null,
        loading: false,
        token: null,
        result: {},
    },
    settings: {
        urls: {
            auth: {
                login: `${host}/api/login`,
                auth: `${host}/api/auth`,
                code: `${host}/api/auth/code`,
            },
        },
    },
}

const mockStore = configureMockStore([thunk])

const loginResponse = {
    authKey: '27d5e8c8ed534557a726758ab10f66fe',
    code: 6150,
}

const sendCodeResponse = {
    session: 'PH1EJuRyGu0ryKigUJfidw==',
    token: '914b7fbe9fd0491a81e60fc3f60ef93b',
}

describe('Login actions', () => {
    beforeEach(() => {
        jest.useFakeTimers()
        // eslint-disable-next-line no-console
        console.error = jest.fn()
    })

    afterEach(() => {
        nock.cleanAll()
        // eslint-disable-next-line no-console
        console.error.mockReset()
        jest.useRealTimers()
    })

    it('login action is ok', () => {
        nock(host)
            .post('/api/login')
            .reply(200, loginResponse)

        const expectedActions = [
            loginActions.startRequest(),
            loginActions.responseOk(loginResponse),
        ]
    
        const store = mockStore(initialStore)
        return (store.dispatch(loginActions.login('test@email.com')))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            }, () => {
                fail('This case was not expected.')
            })
    })
    
    it('sendCode action is ok', () => {
        nock(host)
            .post('/api/auth/code')
            .reply(200, sendCodeResponse)

        const expectedActions = [
            loginActions.startRequest(),
            loginActions.codeResponseOk(sendCodeResponse),
        ]
    
        const store = mockStore(initialStore)
        return (store.dispatch(loginActions.sendCode(loginResponse)))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            }, () => {
                fail('This case was not expected.')
            })
    })
})
