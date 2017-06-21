import { connect } from 'react-redux'

import { login } from 'actions/Login'
import { auth } from 'actions/Auth'
import { LoginPage } from 'components'

const mapStateToProps = (state) => {
    return {
        code: state.login.result.code,
        token: state.login.result.token,
        jwt: state.auth.result.jwt,
    }
}

const mapDispatchToProps = { login, auth }

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)