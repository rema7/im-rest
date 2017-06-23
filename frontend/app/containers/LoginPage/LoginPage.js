import { connect } from 'react-redux'

import { login, sendCode } from 'actions/Login'
import { LoginPage } from 'components'

const mapStateToProps = (state) => {
    return {
        code: state.login.result.code,
        authKey: state.login.result.authKey,
        token: state.login.token,
    }
}

const mapDispatchToProps = { login, sendCode }

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)