import { connect } from 'react-redux'

import { login, sendCode } from 'actions/Login'
import { LoginPage } from 'components'

const mapStateToProps = (state) => {
    const { code, key } = state.login.auth || {}
    return {
        loading: state.login.loading,
        authCode: code,
        authKey: key,
    }
}

const mapDispatchToProps = { login, sendCode }

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)