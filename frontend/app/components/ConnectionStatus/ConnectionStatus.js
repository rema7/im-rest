import React from 'react'
import PropTypes from 'prop-types'

import {
    SERVER_STATE_CONNECTED,
    SERVER_STATE_CONNECTING,
    SERVER_STATE_DISCONNECTED,
} from './translations'

const propTypes = {
    status: PropTypes.string.isRequired,
}

class ConnectionStatus extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            reconnect: false,
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    renderConnectionState() {
        let message = SERVER_STATE_DISCONNECTED
        const { status } = this.props
        if (status === 'connecting') {
            message = SERVER_STATE_CONNECTING
        } else if (status === 'connected') {
            message = SERVER_STATE_CONNECTED
        }
        return (
            <div className="checkbox">
                <span>{message}</span>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderConnectionState()}
            </div>
        )
    }
}

ConnectionStatus.propTypes = propTypes

export default ConnectionStatus
