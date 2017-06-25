import { connect } from 'react-redux'

import { logout } from 'actions/Login'
import { wsConnect, send } from 'actions/Client'
import { ChatPage } from 'components'

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
        messages: state.client.messages,
    }
}

const mapDispatchToProps = { logout, wsConnect, send }

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)