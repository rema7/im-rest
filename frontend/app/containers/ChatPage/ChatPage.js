import { connect } from 'react-redux'

import { logout } from 'actions/Login'
import { ChatPage } from 'components'

const mapStateToProps = (state) => {
    return {
        jwt: state.login.jwt,
    }
}

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)