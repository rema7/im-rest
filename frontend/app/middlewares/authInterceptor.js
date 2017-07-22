import { logout } from 'actions/Login'

const authInterceptor = (() => {
    return ({ dispatch }) => (next) => (action) => {
        if (action.data && action.data.status === 401) {
            dispatch(logout())
        } else {
            return next(action)
        }
    }
})()

export default authInterceptor