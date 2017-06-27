import { connect } from 'react-redux'

import { login, sendCode, auth, authorised } from 'actions/Login'
import { LoginPage } from 'components'

const mapStateToProps = (state) => {
    return {
        loading: state.login.loading,
        code: state.login.result.code,
        authKey: state.login.result.authKey,
        token: state.login.token,
        session: state.login.session,
    }
}

const mapDispatchToProps = { login, sendCode, auth, authorised }

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)