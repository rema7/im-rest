import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import 'jest-localstorage-mock'

import * as appActions from 'actions/App'
import * as loginActions from 'actions/Login'

const initialStore = {
    app: {
        loading: false,
    },
}

const mockStore = configureMockStore([thunk])

describe('App actions', () => {
    it('init is ok', () => {
        const expectedActions = [
            appActions.startInit(),
            loginActions.initFromStorage(),
            appActions.finishInit(),
        ]
        const store = mockStore(initialStore)
        return (store.dispatch(appActions.init()))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            }, () => {
                fail('This case was not expected.')
            })
    })
})
