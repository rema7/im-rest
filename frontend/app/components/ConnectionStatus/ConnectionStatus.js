import React from 'react'
import PropTypes from 'prop-types'

import {
    SERVER_STATE_CONNECTED,
    SERVER_STATE_CONNECTING,
    SERVER_STATE_DISCONNECTED,
} from './translations'

const propTypes = {
    connectionStatus: PropTypes.string.isRequired,

    connect: PropTypes.func.isRequired,
    connecting: PropTypes.func.isRequired,
}

class ConnectionStatus extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.connect()
    }

    reconnect() {
        setTimeout(() => {
            this.props.connect()
        }, 2000)
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.connectionStatus === 'disconnected') {
            this.props.connecting()
            this.reconnect()
        }
    }

    renderConnectionState() {
        let message = SERVER_STATE_DISCONNECTED
        const { connectionStatus } = this.props
        if (connectionStatus === 'connecting') {
            message = SERVER_STATE_CONNECTING
        } else if (connectionStatus === 'connected') {
            message = SERVER_STATE_CONNECTED
        }
        return (
            <h1>Server status: {message}</h1>
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
