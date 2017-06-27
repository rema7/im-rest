import { connect } from 'react-redux'

import { logout } from 'actions/Login'
import { wsConnect, send, disconnect } from 'actions/Client'
import { ChatPage } from 'components'

const mapStateToProps = (state) => {
    return {
        session: state.login.session,
        messages: state.client.messages,
        ws: {
            errorMessage: state.client.errorMessage,
            connecting: state.client.connecting,
            connected: state.client.connected,
        },
    }
}

const mapDispatchToProps = { logout, wsConnect, send, disconnect }

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)