import { connect } from 'react-redux'

import { login, sendCode } from 'actions/Login'
import { LoginPage } from 'components'

const mapStateToProps = (state) => {
    return {
        code: state.login.result.code,
        token: state.login.result.token,
        jwt: state.login.jwt,
    }
}

const mapDispatchToProps = { login, sendCode }

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)