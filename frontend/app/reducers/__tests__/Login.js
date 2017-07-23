import * as actions from 'actions/Login'
import { login } from 'reducers/Login'

const initialState = {
    errorMessage: null,
    loading: false,
    token: null,
    auth: null,
}


let state = initialState

describe('Login reducer', () => {
    it('should return the initial state', () => {
        expect(login(void 0, {})).toEqual(state)
    })

    it('should update result after login action', () => {
        const action = {
            type: actions.LOGIN_RESPONSE_OK,
            data: {
                key: '27d5e8c8ed534557a726758ab10f66fe',
                code: '6150',
            },
        }
        state = login(state, action)
        expect(state.errorMessage).toBeNull()
        expect(state.auth).toEqual({
            key: '27d5e8c8ed534557a726758ab10f66fe',
            code: '6150',
        })
        expect(state.loading).toBeFalsy()
    })

    it('should update token after sendCode action', () => {
        const action = {
            type: actions.LOGIN_SEND_CODE_RESPONSE_OK,
            data: {
                token: '914b7fbe9fd0491a81e60fc3f60ef93b',
                code: '6150',
            },
        }
        state = login(state, action)
        expect(state.errorMessage).toBeNull()
        expect(state).toEqual({
            token: '914b7fbe9fd0491a81e60fc3f60ef93b',
            errorMessage: null,
            loading: false,
            auth: null,
        })
        expect(state.loading).toBeFalsy()
    })
})
