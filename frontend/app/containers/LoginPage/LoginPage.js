import { connect } from 'react-redux'

import { login, sendCode } from 'actions/Login'
import { fetchAccount } from 'reducers/Login'
import { LoginPage } from 'components'

const mapStateToProps = (state) => {
    const { code, key, token } = state.login.auth || {}
    return {
        loading: state.login.loading,
        authCode: code,
        authKey: key,
        token: token,
        account: state.account,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login:(email) => {
            dispatch(login(email))
        },
        sendCode:(obj) => {
            dispatch(sendCode(obj))
        },
        fetchAccount:() => {
            dispatch(fetchAccount())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)