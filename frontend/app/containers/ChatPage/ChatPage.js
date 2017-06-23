import { connect } from 'react-redux'

import { logout } from 'actions/Login'
import { ChatPage } from 'components'

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
    }
}

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)